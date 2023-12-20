import { Request, Response } from 'express';
import prisma from '../prisma_client.ts';
import { env } from '../common/setupEnv.ts';
import jwt from 'jsonwebtoken';

const JWT_SECRET = env.JWT_TOKEN_SECRET;


export const get_events_for_user = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const perms = (decoded as any).canPostEvents; //
    if (!perms){
      return res.status(403).json({error: "dont have perms to be here"})
    }



    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            createdById: userId,
          },
        ],
      },
      // for showing tags and location
      include: {
        tags: true,
        location: true,
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const get_active_events = async (_: Request, res: Response) => {
  try {
    const now = new Date();
    const activeEvents = await prisma.event.findMany({
      where: {
        AND: [
          {
            exp_time: {
              gt: now,
            },
          },
          {
            done: false,
          },
        ],
      },
      include: {
        tags: true,
        location: true,
        photos: true,
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.json({ events: activeEvents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const get_event_by_id = async (req: Request, res: Response) => {
  // Fields expected from the client in the GET request:
  // - event_id: number
  const { event_id } = req.params;

  // Check if event_id exists and is a valid number
  if (!event_id || isNaN(Number(event_id))) {
    return res.status(400).json({ error: 'Invalid event_id' });
  }
  try {
    const event = await prisma.event.findUnique({
      where: { event_id: Number(event_id) },
      include: {
        tags: true,
        location: true,
        photos: true,
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });
    if (event === null) {
      return res.status(404).json({ error: 'Event ID not found' });
    }
    return res.json(event);
  } catch (error) {
    console.error('Error retrieving event description:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const create_event = async (req: Request, res: Response) => {
  const { exp_time, description, qty, tags, photos, location } = req.body;

  try {
    const userId = req.body.user.userId;
    const now = new Date().toISOString();
    console.log('Value of tags:', tags);
    console.log(tags);
    const photoEntries = photos.map((photo) => {
      return {
        photo: photo,
      };
    });
    let tagsData = {};
    if (tags && tags.length > 0) {
      tagsData = { connect: tags.map((tagId => ({ tag_id: tagId }))) };
    }

    const newEvent = await prisma.event.create({
      data: {
        post_time: now,
        exp_time,
        description,
        qty,
        done: false,

        tags: tagsData,
        createdBy: {
          connect: { id: userId },
        },
        createdAt: now,
        updatedAt: now,
        photos: {
          create: photoEntries,
        },
        location: {
          create: {
            Address: location.Address,
            floor: location.floor,
            room: location.room,
            loc_note: location.loc_note,
          },
        },
      },
    });

    res.status(201).json(newEvent);
    
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const edit_event = async (req: Request, res: Response) => {
  const { event_id } = req.params;
  const { exp_time, description, qty, location, photo, tag_ids } = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: {
        event_id: Number(event_id),
      },
      data: {
        exp_time,
        description,
        qty,
        location: {
          update: {
            Address: location.Address,
            floor: location.floor,
            room: location.room,
            loc_note: location.loc_note,
          },
        },
        tags: {
          set: tag_ids.map((tag_id: number) => ({ tag_id })),
        },
      },
      include: {
        tags: true,
        location: true,
        photos: true,
      },
    });

    if (photo) {
      const newPhoto = await prisma.photo.create({
        data: {
          photo: photo,
          event: { connect: { event_id: updatedEvent.event_id } },
        },
      });
      updatedEvent.photos.push(newPhoto);
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
