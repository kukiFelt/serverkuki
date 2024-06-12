import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listCourse(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  const courses = await client.query(`select * from courses`)
  //retorna consulta em formato json
  return res.status(200).json(courses.rows);
}
export async function saveCourse(req: Request, res: Response) {
  const course = req.body;
  // verifica o erro
  console.log(course)
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  const response = await client.query(`INSERT INTO courses (name) VALUES ('${course.name}')`)
  res.status(201).json(response);
}

export async function deleteCourse(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  const id = req.params.id
  try {
    const response = await client.query(`delete from coyrses where id=${id}`);
    res.status(200).json({"message": "Registro Excluido"})
  } catch (error) {
    res.status(404).json({message:error});
  }finally {
client.release()
  }
}

