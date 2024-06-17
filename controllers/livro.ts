import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function deleteLivro(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  const id = req.params.id
  try {
    const response = await client.query(`delete from livros where id=${id}`);
    res.status(200).json({"message": "Registro Excluido"})
  } catch (error) {
    res.status(404).json({message:error});
  }finally {
client.release()
  }
}

export async function listLivro(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const livros = await client.query(`select * from livro`)
    if (livros.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" })
    }
    //retorna consulta em formato json
    return res.status(200).json(livros.rows);
  }catch (error){
    console.log(error)
  }finally{
    client.release;
  }
}
export async function saveLivro(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  const livros = req.body;
  console.log(livros);
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO livros (titulo, descricao) VALUES ('${livros.titulo}','${livros.descricao}')`)
    res.status(201).json(response.rows);
    //verifica o erro
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados invalidos', error });
  } finally {
    client.release();
    console.log
  }
}


