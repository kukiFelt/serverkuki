import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function deleteProduct(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  const id = req.params.id
  try {
    const response = await client.query(`delete from products where id=${id}`);
    res.status(200).json({"message": "Registro Excluido"})
  } catch (error) {
    res.status(404).json({message:error});
  }finally {
client.release()
  }
}

export async function listProduct(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const escolas = await client.query(`select * from products`)
    if (escolas.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" })
    }
    //retorna consulta em formato json
    return res.status(200).json(escolas.rows);
  }catch (error){
    console.log(error)
  }finally{
    client.release;
  }
}
export async function saveProduct(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  const products = req.body;
  console.log(products);
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO products (name) VALUES ('${products.name}')`)
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


