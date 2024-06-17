import { Router } from "express";
import { deleteCourse, listCourse, saveCourse } from "./controllers/course";
import { listStudent, saveStudent, deleteStudent } from "./controllers/student";
import { listEscola, saveEscola, deleteEscola } from "./controllers/escola";
import { listLivro, saveLivro, deleteLivro } from "./controllers/livro";
const router = Router();

router.get("/courses", listCourse);
router.post("/courses", saveCourse);
router.delete("/courses/:id", deleteCourse);

router.get("/students", listStudent);
router.post("/students", saveStudent);
router.delete("/students/:id", deleteStudent);

router.get("/escolas", listEscola);
router.post("/escolas", saveEscola);
router.delete("/escolas/:id", deleteEscola);

router.get("/livros", listLivro);
router.post("/livros", saveLivro);
router.delete("/livros/:id", deleteLivro);


export { router };
