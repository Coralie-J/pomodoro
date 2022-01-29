import logo from './logo.svg';
import './App.css';
import React from 'react';

const styles = {
    textAlign: "center",
    borderRadius: '10px',
    margin: 'auto',
    width: '50%',
    padding: '20px',
    backgroundColor: '#F2EDEB',
    paragraphe:{
        fontSize: '27px'
    },
    timer: {
        fontSize: '120px',
    },
    button:{
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '25px',
        paddingRight: '25px',
        marginRight: '20px',
        backgroundColor: 'black',
        color: 'white',
        fontSize:'14px',
        borderRadius: '10px'
    },
    form:{
        width: '100%',
        textAlign: "center",
    },
    form_div:{
        width: '20%',
        backgroundColor: 'white',
        height: '100%'
    }
};

const styles_form = {
    width: '10%',
    padding: '10px',
    textAlign: "center"
};

const style_div = {
    height: '100%',
    display: 'flex',
    backgroundColor: '#00C49A'
}

let timer = 0;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerMinutes: 0,
            timerSecondes: 10,
            workTimeMinutes: 30,
            workTimeSecondes: 0,
            breaktimeMinutes: 2,
            breaktimeSecondes: 0,
            disableStart: false,
            alerteStyle: {
                color: 'black',
                fontSize: '120px'
            },
            text: 'Working Time',
            backgroundStyle:{
                height: '100%',
                display: 'flex',
                backgroundColor: '#00C49A'
            }
        };

        this.changeTime = this.changeTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.validateTime = this.validateTime.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.interval = null;
    }

    validateTime(){
        let workTimeMinutesSaisie = document.getElementById('worktimeMinutes').value;
        let workTimeSecondesSaisie = document.getElementById('worktimeSecondes').value;
        let breaktimeMinutesSaisie = document.getElementById('breaktimeMinutes').value;
        let breakTimeSecondesSaisie = document.getElementById('breaktimeSecondes').value;

        if (workTimeMinutesSaisie && workTimeSecondesSaisie){
            this.setState({workTimeMinutes: workTimeMinutesSaisie});
            this.setState({workTimeSecondes: workTimeSecondesSaisie});
        }

        if (breaktimeMinutesSaisie && breakTimeSecondesSaisie){
            this.setState({breaktimeMinutes: breaktimeMinutesSaisie});
            this.setState({breaktimeSecondes: breakTimeSecondesSaisie});
        }
    }

    changeColor(color){
        this.setState({alerteStyle: {color: color, fontSize: '120px'}});
    }

    changeTime(){

        if (this.state.timerSecondes == 0 && this.state.timerMinutes == 0){
            timer++;
            if (timer%2 == 0){

                this.setState({timerMinutes: this.state.workTimeMinutes});
                this.setState({timerSecondes: this.state.workTimeSecondes});
                this.setState({text: 'Working Time'});
                this.setState({backgroundStyle: {
                    height: '100%',
                    display: 'flex',
                    backgroundColor: '#00C49A'}
                });

            } else {

                this.setState({timerMinutes: this.state.breaktimeMinutes});
                this.setState({timerSecondes: this.state.breaktimeSecondes});
                this.setState({text: "Let's take a break"});
                this.setState({backgroundStyle: {
                    height: '100%',
                    display: 'flex',
                    backgroundColor: '#A288E3'}
                });

            }
        }

        if (this.state.timerSecondes < 21 && this.state.timerMinutes == 0)
            this.changeColor('red');
        else{
            if (this.state.alerteStyle.color == 'red')
                this.changeColor('black');
        }

        if (this.state.timerSecondes == 0 && this.state.timerMinutes != 0){
                this.state.timerSecondes = 60;
                if (this.state.timerMinutes > 0)
                    this.setState({timerMinutes: this.state.timerMinutes - 1});
        }

        if (this.state.timerSecondes > 0)
            this.setState({timerSecondes: this.state.timerSecondes - 1});
    }

    startTimer(){
        this.setState({disableStart: true});
        this.interval = setInterval(this.changeTime, 1000);
    }

    stopTimer(){
        this.setState({disableStart: false});
        clearInterval(this.interval);
    }

    resetTimer(){
        this.setState({timerSecondes: this.state.workTimeSecondes});
        this.setState({timerMinutes: this.state.workTimeMinutes });
        this.setState({backgroundStyle: {
            height: '100%',
            display: 'flex',
            backgroundColor: '#00C49A'}
        });
    }

    render() {
        return (
            <div style={this.state.backgroundStyle}>
                <div style={styles.form_div}>
                    <form style={styles.form}>
                        <p>
                            <label for="worktimeMinutes">Temps de travail : </label>
                            <input type="number" placeholder="30" id="worktimeMinutes" name="worktimeMinutes" style={styles_form}/>
                            <span> : </span>
                            <input type="number" placeholder="0" id="worktimeSecondes" name="workTimeSecondes" style={styles_form} max="60"/>
                        </p>
                        <p>
                            <label for="breaktimeMinutes"> Temps de pause : </label>
                            <input type="number" id="breaktimeMinutes" placeholder="10" name="breaktimeMinutes" style={styles_form} />
                            <span> : </span>
                            <input type="number" id="breaktimeSecondes" name="breakTimeSecondes" placeholder="0" style={styles_form} max="60"/>
                        </p>
                        <input type="button" value="Submit" onClick={this.validateTime} style={styles.button} id="btn_valider" />
                    </form>
                </div>

                <div style={styles}>
                    <div>
                        <p style={styles.paragraphe}>{this.state.text}</p>
                    </div>

                    <div>
                        <p style={this.state.alerteStyle}>
                        {this.state.timerMinutes} : {this.state.timerSecondes < 10 ? `0${this.state.timerSecondes}`: this.state.timerSecondes} </p>
                    </div>

                    <input type="button" value="Pause" onClick={this.stopTimer} style={styles.button} />
                    <input type="button" value="Start" onClick={this.startTimer} style={styles.button} disabled={this.state.disableStart} />
                    <input type="button" value="Reset" onClick={this.resetTimer} style={styles.button} />
                </div>
            </div>
        )
    }
}

export default App;
