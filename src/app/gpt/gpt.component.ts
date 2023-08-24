import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})
export class GptComponent implements OnInit {
  queryFormGroup !: FormGroup ;
  messages =[
    {role: "system", content: "You are a helpful assistant."}
  ];
  result : any;

  constructor(private fb:FormBuilder ,
    private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.queryFormGroup=this.fb.group({
      query:this.fb.control("")
    })
  }

  handleAskGpt(){
    let url="https://api.openai.com/v1/chat/completions";
    const maxTokens = 10;
    let httpHeaders=new HttpHeaders()
    .set("Authorization","Bearer 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");
    this.messages.push({
      role:"user",content:this.queryFormGroup.value.query
    })
    let payload={
      model : "gpt-3.5-turbo",
      messages:this.messages
    }
    this.httpClient.post(url,payload,{headers:httpHeaders})
    .subscribe({
      next:(resp)=>{
        this.result=resp;
        this.result.choices.forEach((choise:any)=>{
          this.messages.push({
            role:"assistant", content: choise.message.content
          })
        })
       
      },
      error:(resp)=>{

      }
    })
  }

}
