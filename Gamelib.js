function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

const app = new Vue({
		el: '#app',
		data: {
			timer: null,
			time: 0,
			usedTopic: [],
			Topic: null,
			MaxTopic: 200,
			thisTopic: 0,
			CorrectCnt: 0,
			ErrorCnt: 0,
			TotalTime: 0,
			SettingDialogFlag: false,
			GameTag: 'Game2',
			SupFrontLineData: [{
					ItemName: '鉛筆'
				}, {
					ItemName: '樹枝'
				}, {
					ItemName: '襪子'
				}, {
					ItemName: '衣服'
				}, {
					ItemName: '１００元鈔票'
				}, {
					ItemName: '外套'
				}, {
					ItemName: '眼鏡'
				}, {
					ItemName: '髮夾'
				}, {
					ItemName: '鞋子'
				}, {
					ItemName: '手錶'
				}
			],
			SupFrontLineTableData: [],
			ItemMax: 3,
			ItemCountMax: 9

		},
		methods: {
			TimeAdd() {
				this.time = parseFloat(this.time) + 0.1;
				this.time = this.time.toFixed(1);
				if (parseFloat(this.time) > parseFloat(this.TotalTime)) {
					this.ResetTimer();
					alert("時間結束");
				}
			},
			StartTimer() {
				if (this.TotalTime <= 5) {
					alert("時間不夠喔!");
					return;
				}
				if (this.timer == null) {
					this.timer = setInterval(this.TimeAdd, 100);
					if (this.Topic == null) {
						this.GetTopic();
					}

				}

			},
			PauseTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			ResetTimer() {
				this.time = 0;
				clearInterval(this.timer);
				this.timer = null;
				this.Topic = null;
			},
			GetTopic() {
				var TData = undefined;
				//|| this.usedTopic.includes(TData.Topic
				while (TData == undefined || this.usedTopic.includes(TData.ID)) {
					TData = Hand_painted[parseInt((Math.random() * 100))];
					//if (this.usedTopic.includes(TData.Topic)) TData = undefined;
					this.thisTopic++;
					if (this.thisTopic > this.MaxTopic) {
						alert("沒題目了!");
						break;
					}
				}

				if (TData != undefined) {
					this.Topic = TData.Topic;
					this.usedTopic.push(TData.ID);
				}

			},
			AddCorrectCnt() {
				this.CorrectCnt++;
				this.GetTopic();
			},
			AddErrorCnt() {
				this.ErrorCnt++;
				this.GetTopic();
			},
			ReStart() {
				this.usedTopic = [];
				this.CorrectCnt = 0;
				this.thisTopic = 0;
				this.ErrorCnt = 0;
				this.ResetTimer();

			},
			ChangeGame(inputGameTag) {
				//this.GameTag = !inputGameTag;
				this.GameTag = inputGameTag;
				this.SettingDialogFlag = false;
			},
			SUPFL_Refalsh() {
				if (SupFrontLineData.length < this.ItemMax) {
					alert("沒這麼多題目!!最多" + SupFrontLineData.length + "個");
					return;
				}
				var testmax = 1000;
				var testcnt = 0;
				this.SupFrontLineTableData = [];
				while (this.SupFrontLineTableData.length < this.ItemMax) {
					var rTopic = SupFrontLineData[random(0, SupFrontLineData.length - 1)];
					while (this.SupFrontLineTableData.filter(o => o.ItemName == rTopic.ItemName).length > 0) {
						rTopic = SupFrontLineData[random(0, SupFrontLineData.length - 1)];
					}
					rTopic.ItemCount = random(1, parseFloat(this.ItemCountMax) + 1);
					this.SupFrontLineTableData.push(rTopic);

					testcnt++;
					if (testcnt >= testmax)
						break;
				}

			},
			handleCurrentChange(row, event, column) {
                console.log(row, event, column, event.currentTarget)
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, scope ) {
				this.SupFrontLineTableData =  this.SupFrontLineTableData.filter(o => o.ID != scope.row.ID);
            }
			
		},
		created() {}
	});
