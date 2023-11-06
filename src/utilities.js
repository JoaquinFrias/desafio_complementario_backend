import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};

const fileExist = async (path) => {
    try {
        await fs.promises.access(path);
        return true;
    } catch (error) {
        return false
    }
};

export const getJSONFromFile = async (path) => {
    if(!await fileExist(path)){
        return [];
    }
    let content;
    try {
        content = await fs.promises.readFile(path, 'utf-8');    
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser leído.`);
    }
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato válido.`);
    }
};

export const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t')
    try {
        await fs.promises.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error (`El archivo ${path} no pudo ser escrito`);
    }
};

export function generateID(){
    let d= new Date().getTime();
    let id = 'xxxxxxxxxx'.replace(/[xy]/g, function (c){
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r: (r & 0x3 | 0x8)).toString(16);
    })
    return id
};