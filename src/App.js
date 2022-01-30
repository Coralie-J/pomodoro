import './App.css';
import logo from './tomate.png';
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
        borderRadius: '10px',
        marginTop: '7px'
    },
    form:{
        width: '100%',
        textAlign: "center",
        marginBottom: '50px'
    },
    form_div:{
        width: '20%',
        backgroundColor: 'white',
        height: '100%'
    },
    titre_form : {
        marginBottom: '40px',
        marginTop: '60px'
    },
    info: {
        marginLeft: '10px'
    },
    logo: {
        width: '8%',
        verticalAlign: 'top'
    },
    p_test:{
        textAlign:'right',
        width: '80%',
    },
    label:{
        marginRight: '15px'
    },
    paragraphe_time:{
        marginLeft: '10px',
        width: '80%',
        margin: 'auto',
        marginTop:'20px',
        display: 'flex',
        justifyContent:'space-between'
    },
};

const styles_form = {
    width: '10%',
    padding: '10px',
    textAlign: "center"
};

let timer = 0;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerMinutes: 0,
            timerSecondes: 21,
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
                backgroundColor: '#00C49A',
                height: '100%',
                display: 'flex'
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

            workTimeMinutesSaisie = parseInt(workTimeMinutesSaisie);
            workTimeSecondesSaisie = parseInt(workTimeSecondesSaisie)

            if (workTimeMinutesSaisie > -1 && workTimeSecondesSaisie < 60 && workTimeSecondesSaisie > -1){
                this.setState({workTimeMinutes: workTimeMinutesSaisie});
                this.setState({workTimeSecondes: workTimeSecondesSaisie});
            } else
                alert("Le temps de travail n'est pas au bon format");
        }

        if (breaktimeMinutesSaisie && breakTimeSecondesSaisie){

            breaktimeMinutesSaisie = parseInt(breaktimeMinutesSaisie);
            breakTimeSecondesSaisie = parseInt(breakTimeSecondesSaisie)

            if (breaktimeMinutesSaisie > -1 && breakTimeSecondesSaisie < 60 && breakTimeSecondesSaisie > -1){
                this.setState({breaktimeMinutes: breaktimeMinutesSaisie});
                this.setState({breaktimeSecondes: breakTimeSecondesSaisie});
            }else
                alert("Le temps de travail n'est pas au bon format");
        }
    }

    changeColor(color){
        let copyAlerteStyle = { ...this.state.alerteStyle};
        copyAlerteStyle.color = color;
        this.setState({alerteStyle: copyAlerteStyle});
    }

    changeTime(){

        if (this.state.timerSecondes == 0 && this.state.timerMinutes == 0){
            timer++;
            if (timer%2 == 0){

                this.setState({timerMinutes: this.state.workTimeMinutes});
                this.setState({timerSecondes: this.state.workTimeSecondes});
                this.setState({text: 'Working Time'});

                let copybackgroundstyle = { ...this.state.backgroundStyle};
                copybackgroundstyle.backgroundColor = '#00C49A';

                this.setState({backgroundStyle: copybackgroundstyle});

            } else {

                this.setState({timerMinutes: this.state.breaktimeMinutes});
                this.setState({timerSecondes: this.state.breaktimeSecondes});
                this.setState({text: "Let's take a break"});

                let copybackgroundstyle = { ...this.state.backgroundStyle};
                copybackgroundstyle.backgroundColor = '#A288E3';
                this.setState({backgroundStyle: copybackgroundstyle});
            }
            this.changeColor('black');
            return;
        }

        if (this.state.timerSecondes < 22 && this.state.timerMinutes == 0)
            this.changeColor('red');

        if (this.state.timerSecondes == 0 && this.state.timerMinutes != 0){
                this.setState({timerSecondes: 60});
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
        let copybackgroundstyle = { ...this.state.backgroundStyle};
        copybackgroundstyle.backgroundColor = '#00C49A';
        this.setState({backgroundStyle: copybackgroundstyle});
    }

    render() {
        return (
            <div style={this.state.backgroundStyle}>
                <div style={styles.form_div}>
                    <h1 style={styles.info}><img src={logo} alt="logo" style={styles.logo}/>Pomodoro </h1>
                    <form style={styles.form}>
                        <h3 style={styles.titre_form}> Change Working/Break time </h3>
                            <p style={styles.p_test}>
                                <label style={styles.label} for="worktimeMinutes">Working Time : </label>
                                <input type="number" placeholder="30" id="worktimeMinutes" name="worktimeMinutes" style={styles_form} min="0"/>
                                <span> : </span>
                                <input type="number" placeholder="0" id="worktimeSecondes" name="workTimeSecondes" style={styles_form} min="0" max="60"/>
                            </p>
                            <p style={styles.p_test}>
                                <label style={styles.label} for="breaktimeMinutes"> Break Time : </label>
                                <input type="number" id="breaktimeMinutes" placeholder="10" name="breaktimeMinutes" style={styles_form}  min="0" />
                                <span> : </span>
                                <input type="number" id="breaktimeSecondes" name="breakTimeSecondes" placeholder="0" style={styles_form} min="0" max="60"/>
                            </p>

                        <input type="button" value="Submit" onClick={this.validateTime} style={styles.button} id="btn_valider" />
                    </form>

                    <p style={styles.paragraphe_time}>
                        <span>Working Time : </span> {this.state.workTimeMinutes} :
                            {this.state.workTimeSecondes < 10 ? `0${this.state.workTimeSecondes}`: this.state.workTimeSecondes} </p>

                    <p style={styles.paragraphe_time}> <span> Break time: </span> {this.state.breaktimeMinutes} :
                        {this.state.breaktimeSecondes < 10 ? `0${this.state.breaktimeSecondes}`: this.state.breaktimeSecondes}  </p>
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
