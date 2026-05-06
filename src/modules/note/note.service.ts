import prisma from '../../utils/prisma';

export default class NoteService {
  public async getNotesByTask(taskId: string) {
    return prisma.note.findMany({
      where: { taskId },
      include: {
        author: { select: { id: true, name: true, email: true, avatarUrl: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  public async createNote(taskId: string, authorId: string, content: string) {
    // Verify task exists
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new Error('Task not found');

    return prisma.note.create({
      data: {
        content,
        taskId,
        authorId
      },
      include: {
        author: { select: { id: true, name: true, email: true, avatarUrl: true } }
      }
    });
  }

  public async updateNote(noteId: string, authorId: string, content: string) {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note) throw new Error('Note not found');
    if (note.authorId !== authorId) throw new Error('Unauthorized: You can only edit your own notes');

    return prisma.note.update({
      where: { id: noteId },
      data: { content },
      include: {
        author: { select: { id: true, name: true, email: true, avatarUrl: true } }
      }
    });
  }

  public async deleteNote(noteId: string, authorId: string) {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note) throw new Error('Note not found');
    if (note.authorId !== authorId) throw new Error('Unauthorized: You can only delete your own notes');

    await prisma.note.delete({ where: { id: noteId } });
    return true;
  }
}
