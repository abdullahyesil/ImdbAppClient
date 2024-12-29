import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Comments } from '../../model/entities/DTO/comments';
import { CommentService } from '../../services/comment.service';
import { AlertifyServiceService } from '../../services/alertify-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

first: number=0;
rows: number= 5;
totalCount: number= 0;
onay:boolean;
selectedStatus: any= null;

onPageChange($event: PaginatorState) {
  this.loadComment($event.page,this.rows,this.selectedStatus)
}
  comments:Comments[]= []

  constructor(
private commentService:CommentService,
private alertify:AlertifyServiceService
  ) { }

  ngOnInit(): void {
    
    this.filterComments(this.selectedStatus); // İlk yüklemede tüm yorumları göster
  }

loadComment(page:number,size:number, onay?:boolean){
  if(onay!=null){
this.commentService.getAllComments(page,size,onay).subscribe(resp=>
{
  this.comments= resp.comments
  this.totalCount = resp.totalCount
})
  }
else{
  this.commentService.getAllComments(page,size).subscribe(resp=>
    {
      this.comments= resp.comments
      this.totalCount = resp.totalCount
    })

}


}

approvedComment(commentId: number) {
  this.commentService.approve(commentId).subscribe(resp=> {
    this.alertify.succes(resp.message)
    this.loadComment(this.first, this.rows, this.selectedStatus)
  })
  }

  deleteComment(comment: any) {
    console.log('Yorum sil:', comment);
    // Yorum silme işlemi
  }


  filterComments($event: any) {
   this.loadComment(this.first,this.rows,this.selectedStatus)
    }
}
