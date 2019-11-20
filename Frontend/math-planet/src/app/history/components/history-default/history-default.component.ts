import { SharedService } from './../../../shared/services/shared.service';
import { HistoryService } from './../../services/history.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
	selector: 'app-history-default',
	templateUrl: './history-default.component.html',
	styleUrls: [ './history-default.component.scss' ]
})
export class HistoryDefaultComponent implements OnInit {
  displayedColumns: string[] = ['createdTime','imageLink', 'equation', 'solution' ];
  equations = new MatTableDataSource<any>();
  @ViewChild(MatSort)
	sort: MatSort;
	@ViewChild(MatPaginator)
	paginator: MatPaginator;
	// data= [];
	constructor(private historyService: HistoryService,private sharedService:SharedService) {}

	ngOnInit() {
		this.setData();
	}
	setData() {
		this.historyService.getUserId().subscribe((res1) => {
      this.sharedService.startSpinner();
			this.historyService.getHistory(res1).subscribe((res) => {
        res.sort((a, b) => (a.createdTime < b.createdTime) ? 1 : -1)

        this.equations.data = res;
        this.equations.sort = this.sort;
        this.equations.paginator = this.paginator;
        this.sharedService.hideSpinner();
        // this.data=res;
        // console.log(res);
        // debugger;
			});
		});
  }
  applyFilter(filterValue: string) {
		this.equations.filter = filterValue.trim().toLowerCase();
	}
}
