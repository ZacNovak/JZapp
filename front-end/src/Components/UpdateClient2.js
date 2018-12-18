class UpdateClient2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: " ",
            isOpen: false
        };
        this.updateClients = this.props.updateClients;
        this.id = this.props.id;
        
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    }
    
    handleSubmit = (event) => {
        console.log('A name was submitted: ' + this.state.name +'with an id of ' + this.id);
        event.preventDefault();

        let data = {
            id: this.id,
            name:this.state.name
        }
 
        fetch('http://localhost:5000/updateClient', {
                method: 'put',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(this.updateClients)
             
            
        
    }
    
    render() {
        return (
        <div class="form-popup" id="myForm">
        <form action="/action_page.php" class="form-container">
            <h1>Login</h1>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required>

            <button type="submit" class="btn">Login</button>
            <button type="submit" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
        </div>
                
        );
    }

}

// -------------------------------------------------------------- //



export default UpdateClient2;