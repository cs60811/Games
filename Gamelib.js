function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

const app = new Vue({
		el: '#app',
		data: {
			timer: null,
			time: 0,
			SettingDialogFlag: false,
			GameTag: 'Game1',
			SupFrontLineTableData: [],
			ItemMax: 3,
			ItemCountMax: 9,
			Game3Obj: {
				usedTempoTopic: [],
				Tempo: {
					Question: null,
					TableData: null
				}
			},
			Game1Obj: {
				usedTopic: [],
				Topic: null,
				CorrectCnt: 0,
				ErrorCnt: 0,
				TotalTime: 10
			}

		},
		methods: {
			Game1: function () {
				return {
					StartTimer() {
						if (this.Create_Timer('Positive', this.Game1Obj.TotalTime, null, null)) {
							if (this.Game1Obj.Topic == null) {
								this.Game1().GetTopic.apply(app);
							}
						}

					},
					GetTopic() {
						var TData = undefined;
						while (TData == undefined || this.Game1Obj.usedTopic.includes(TData.ID)) {
							TData = Hand_painted[parseInt(random(0,Hand_painted.length))];
							
							if (this.Game1Obj.usedTopic.length >= Hand_painted.length) {
								alert("沒題目了!");
								this.Reset_Timer();
								return;
							}
						}

						if (TData != undefined) {
							this.Game1Obj.Topic = TData.Topic;
							this.Game1Obj.usedTopic.push(TData.ID);
						}

					},
					AddCorrectCnt() {
						this.Game1Obj.CorrectCnt++;
						this.Game1().GetTopic.apply(app);
					},
					AddErrorCnt() {
						this.Game1Obj.ErrorCnt++;
						this.Game1().GetTopic.apply(app);
					},
					ReStart() {
						this.Game1Obj.usedTopic = [];
						this.Game1Obj.CorrectCnt = 0;
						this.Game1Obj.ErrorCnt = 0;
						this.Reset_Timer();

					}
				}
			},
			Game3: function () {
				return {

					Reflash_Question() {
						var a = 0;
						var TData = undefined;
						while (TData == undefined || this.Game3Obj.usedTempoTopic.includes(TData.ID)) {

							TData = Tempo_Data[parseInt(random(0, Tempo_Data.length))];

							if (this.Game3Obj.usedTempoTopic.length >= Tempo_Data.length) {
								alert("沒題目了!");
								return;
							}

							a++;
							if (a > 100) {
								alert("Error");
								return;
							}
						}

						if (TData != undefined) {
							this.Game3Obj.Tempo.Question = TData.Question;
							this.Game3Obj.Tempo.TableData = TData.Child;
							this.Game3Obj.usedTempoTopic.push(TData.ID);
						}
					},
					ReStartGame3() {
						this.Game3Obj.Tempo.Question = null;
						this.Game3Obj.Tempo.TableData = null;
						this.Game3Obj.usedTempoTopic = [];
					}
				}
			},

			ChangeGame(inputGameTag) {
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
			handleDelete(index, scope) {
				this.SupFrontLineTableData = this.SupFrontLineTableData.filter(o => o.ID != scope.row.ID);
			},
			Create_Timer(type, period, invfunc, cbfunc) {
				var AddTimeFunc = null;

				if (period <= 5) {
					alert("時間至少大於5秒!");
					return;
				}
				switch (type) {
				case 'Positive':
					AddTimeFunc = function PositiveAdd() {

						app.time = (parseFloat(app.time) + 0.1).toFixed(1);
						//console.log(app.time);
						if (typeof invfunc == 'function') {
							invfunc(app.time);
						}

						if (parseFloat(app.time) > parseFloat(period)) {

							if (typeof cbfunc == 'function') {
								cbfunc();
							}
							clearInterval(app.timer);
							app.Reset_Timer();
							alert("時間結束");
						}
					}

					break;
				case 'Reverse':
					if (parseFloat(app.time) > 0) {
						app.time = parseFloat(app.time).toFixed(1);
					} else {
						app.time = parseFloat(period).toFixed(1);
					}

					AddTimeFunc = function ReverseAdd() {
						app.time = (parseFloat(app.time) - 0.1).toFixed(1);
						//console.log(app.time);
						if (typeof invfunc == 'function') {
							invfunc(app.time);
						}

						if (parseFloat(app.time) < 0) {

							if (typeof cbfunc == 'function') {
								cbfunc();
							}
							clearInterval(app.timer);
							app.Reset_Timer();
							alert("時間結束");
						}
					}

					break;
				default:
					return;
				}

				if (app.timer == null) {
					app.timer = setInterval(AddTimeFunc, 100);
					return true;
				}

				return false;

			},
			//暫停
			Pause_Timer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			//重設
			Reset_Timer() {
				clearInterval(this.timer);
				this.time = 0;
				this.timer = null;
			}

		},
		created() {}
	});
