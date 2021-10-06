import { EventEmitter, Injectable } from '@angular/core';
import { Contato } from '../models/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  static onContatosMudaram:EventEmitter<Contato[]> = new EventEmitter();

  private readonly chave:string ="CONTATOS"

  constructor() { }

  getContatos():Contato[] {
    //Tentar carregar os dados da localStorage
  let dados = window.localStorage.getItem(this.chave);

    //Verificar se havia dados na localStorage
  if(dados) {
    //Se houver dados => (Transformarr dados em array; Retornar os arrays de contatos)

    let contatosCarregados:Contato[] = JSON.parse(dados);
    return contatosCarregados;
  }else {
    //Se não houver dados => (Crio um array vazio; guardo uma array vazia no localStorage; retorna o array vazia;)

    window.localStorage.setItem(this.chave, "[]")
    return []
  }

  }

  addContato(c:Contato): void {
    //Levantar os contatos do localStorage para um array de contatos
    let contatos = this.getContatos();
    //Adicionar o contato c ao final d o array
    contatos.push(c)
    //Salvar o array de volta no localStorage
    window.localStorage.setItem(this.chave, JSON.stringify(contatos))

    //Emitindo evento "contatos mudaram"
    ContatoService.onContatosMudaram.emit(contatos)
  }

}
