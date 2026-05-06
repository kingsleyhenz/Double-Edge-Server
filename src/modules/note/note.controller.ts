import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpResponse from '../../utils/http-response';
import NoteService from './note.service';

export default class NoteController {
  private noteService = new NoteService();

  public getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const result = await this.noteService.getNotesByTask(taskId);
      return HttpResponse.success(res, StatusCodes.OK, 'Notes retrieved successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const { content } = req.body;
      const authorId = req.user!.userId;
      
      const result = await this.noteService.createNote(taskId, authorId, content);
      return HttpResponse.success(res, StatusCodes.CREATED, 'Note created successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const authorId = req.user!.userId;

      const result = await this.noteService.updateNote(id, authorId, content);
      return HttpResponse.success(res, StatusCodes.OK, 'Note updated successfully', result);
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const authorId = req.user!.userId;

      await this.noteService.deleteNote(id, authorId);
      return HttpResponse.success(res, StatusCodes.OK, 'Note deleted successfully', null);
    } catch (error) {
      next(error);
    }
  };
}
