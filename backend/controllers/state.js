const machine = {
    state: "OFF",
    transitions: {
        OFF: {
            press() {
                this.state = 'WRITE'
            }
        }, WRITE: {
            press() {
                this.state = 'FINISH'
            }
        }, FINISH: {
            press() {
                this.state = 'OFF'
            }
        }
    },
    async dispatch(actionName) {
        const action = this.transitions[this.state][actionName];
        if (action) {
            await action.call(this);
        } else {

        }
    },
    async stateWait(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {

            // const action = this.transitions[this.state]['press'];
            // if (action) {
            //     await action.call(this);
            // } else {

            // }
        }

    }
}
const stateMachine = Object.create(machine);

module.exports = { stateMachine };