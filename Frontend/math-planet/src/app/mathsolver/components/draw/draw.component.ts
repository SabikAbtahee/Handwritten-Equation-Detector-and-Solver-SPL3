import { Component, OnInit, HostListener } from '@angular/core';
import { Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { MathsolverService } from '../../services/mathsolver.service';
import { UtilityService } from 'src/app/core/utility-service/utility.service';
import canvasToImage from 'canvas-to-image';
@Component({
	selector: 'app-draw',
	templateUrl: './draw.component.html',
	styleUrls: [ './draw.component.scss' ]
})
export class DrawComponent implements OnInit, AfterViewInit {
	canvasEl: HTMLCanvasElement;
	widthMinus = 300;
	mode = 'pen';
	check;

	constructor(private mathsolver: MathsolverService, private utility: UtilityService) {}

	ngOnInit() {}
	@ViewChild('canvas') public canvas: ElementRef;

	@Input() public width = this.widthMinus;
	@Input() public height = 200;

	@HostListener('window:resize', [ '$event' ])
	onResize(event) {
		this.canvasEl.width = event.target.innerWidth - this.widthMinus;
		this.canvasEl.height = 200;
	}

	private cx: CanvasRenderingContext2D;

	public ngAfterViewInit() {
		this.canvasEl = this.canvas.nativeElement;
		this.cx = this.canvasEl.getContext('2d');

		this.canvasEl.width = screen.width - this.widthMinus;
		this.canvasEl.height = 200;
		this.cx.fillStyle='#ffffff';
		this.cx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
		this.cx.lineWidth = 5;
		this.cx.lineCap = 'round';
		this.cx.strokeStyle = '#000';

		this.captureEvents(this.canvasEl);
	}

	private captureEvents(canvasEl: HTMLCanvasElement) {
		fromEvent(canvasEl, 'mousedown')
			.pipe(
				switchMap((e) => {
					return fromEvent(canvasEl, 'mousemove').pipe(
						takeUntil(fromEvent(canvasEl, 'mouseup')),
						takeUntil(fromEvent(canvasEl, 'mouseleave')),
						pairwise()
					);
				})
			)
			.subscribe((res: [MouseEvent, MouseEvent]) => {
				const rect = canvasEl.getBoundingClientRect();

				const prevPos = {
					x: res[0].clientX - rect.left,
					y: res[0].clientY - rect.top
				};

				const currentPos = {
					x: res[1].clientX - rect.left,
					y: res[1].clientY - rect.top
				};

				this.drawOnCanvas(prevPos, currentPos);
			});
	}

	private drawOnCanvas(prevPos: { x: number; y: number }, currentPos: { x: number; y: number }) {
		if (!this.cx) {
			return;
		}

		this.cx.beginPath();
		if (prevPos && this.mode == 'pen') {
			this.cx.globalCompositeOperation = 'source-over';
			this.cx.lineWidth = 5;
			this.cx.strokeStyle = '#000';
			this.cx.moveTo(prevPos.x, prevPos.y); // from
			this.cx.lineTo(currentPos.x, currentPos.y);
			this.cx.stroke();
		} else if (prevPos && this.mode == 'eraser') {
			this.cx.globalCompositeOperation = 'source-over';
			this.cx.lineWidth = 20;
			this.cx.strokeStyle = '#ffffff';
			this.cx.moveTo(prevPos.x, prevPos.y); // from
			this.cx.lineTo(currentPos.x, currentPos.y);
			this.cx.stroke();
		}
	}

	changeMode(name) {
		this.mode = name;
	}

	clearCanvas() {
		this.cx.clearRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
		this.cx.fillStyle='#ffffff';
		this.cx.fillRect(0, 0, this.cx.canvas.width, this.cx.canvas.height); // Clears the canvas
	}

	saveImage() {
		let base64 = this.canvasEl.toDataURL('image/png');
		let base64Data = base64.slice(22);
		this.mathsolver.predictBase64({
			base64:base64Data
		}).subscribe(res=>{
			console.log(res);
		})
	}
}
