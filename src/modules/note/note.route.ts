import { Router } from 'express';
import NoteController from './note.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';

const router = Router();
const noteController = new NoteController();

// Routes nested under /tasks/:taskId/notes in app.ts, OR independent.
// We'll structure it such that GET and POST are /tasks/:taskId/notes,
// but PATCH and DELETE are /notes/:id

router.get('/task/:taskId', authMiddleware, noteController.getNotes);
router.post('/task/:taskId', authMiddleware, validationMiddleware(CreateNoteDto), noteController.createNote);
router.patch('/:id', authMiddleware, validationMiddleware(UpdateNoteDto), noteController.updateNote);
router.delete('/:id', authMiddleware, noteController.deleteNote);

export default router;
