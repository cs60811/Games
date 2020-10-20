
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
            ErrorCnt: 0 , 
			TotalTime : 0

        },
        methods: {
            TimeAdd() {
                this.time = parseFloat(this.time) + 0.1;
                this.time = this.time.toFixed(1);
				if (parseFloat(this.time) > parseFloat(this.TotalTime)){
					this.ResetTimer();
					alert("時間結束");
				}
            },
            StartTimer() {
				if (this.TotalTime <= 5){
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
			ReStart (){
				this.usedTopic = [];
				this.CorrectCnt = 0;
				this.thisTopic = 0;
				this.ErrorCnt =  0;
				this.ResetTimer();
				
			}

        },
        created() {}
    });
