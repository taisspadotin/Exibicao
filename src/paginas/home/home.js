import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton, showTable, GuardaDados} from '../../actions';
import { Button, Checkbox, Form, Table} from 'semantic-ui-react';
import Navegacao from '../../components/menu/menu';

class Home extends Component{
	constructor(props){
		super(props);
		
		//refs
		this.refNome  = React.createRef();
		this.refUser  = React.createRef();
		this.refSobre = React.createRef();
		this.refEmail = React.createRef();
		
	}
	state = {
		nomeValue: '',
		userValue: '',
		sobreValue: '',
		emailValue: '',
		valores: []
	}  
  
    inputChange = event => {
	 const nome = event.target.name;
     this.setState({
       [nome]: event.target.value
     })
    } 

	inputValor2Change = event =>{
		this.setState({
			nomeValue2: event.target.value
		})
	}
	
	exibe = () =>{
		const {nomeValue} = this.state;
		if(nomeValue === ''){
			this.refNome.current.focus();
			alert('Preencha o nome');
		}
		else
		{
			
			let data = [];
			let info = {};
			info['nome'] = (this.refNome.current.value);
			if(this.refUser.current !== null){
			info['user'] = (this.refUser.current.value);
			}
			if(this.refEmail.current !== null){
			info['email'] = (this.refEmail.current.value);
			}
			
			data.push(info);
			/*var joined = this.state.valores.concat(data);
			this.setState({valores: joined});*/
			
			var joined = this.props.dados.concat(data);
			this.props.GuardaDados(joined);
			
			//console.log(this.state.valores);
			this.props.showTable(true);
		}
	}

  
  render() {
    const {
      clickButton,
      newValue,
	  showTable,
	  showTb,
	  GuardaDados,
	  dados
    } = this.props;    
	
	//console.log(dados);
	const { nomeValue, aboutValue, emailValue, userValue } = this.state;   
	let tabela = '';
	if(showTb === true)
	{
		
		tabela =
			<Table celled fixed singleLine>
			<Table.Header>
			  <Table.Row>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<Table.HeaderCell>User</Table.HeaderCell>
				<Table.HeaderCell>Email</Table.HeaderCell>
			  </Table.Row>
			</Table.Header>

			<Table.Body>
			{this.props.dados.map((row)=>
			  <Table.Row key={row.nome} >
				<Table.Cell>{row.nome}</Table.Cell>
				<Table.Cell>{row.user}</Table.Cell>
				<Table.Cell>{row.email}</Table.Cell>
			  </Table.Row>
	)}
			</Table.Body>
		  </Table>;
	} 
	  
	return (
	<>
	<Navegacao ativo="cadastro"/>	
      <div className="App" style={{ paddingTop: '10px' }}>
	 
        <Form>
			<Form.Field>
			  <label>Nome</label>
			  <input onChange={this.inputChange} name='nomeValue' ref={this.refNome} type='text' value={nomeValue}/>
			</Form.Field>
			<Form.Field>
				<label>About</label>
				<input ref={this.refSobre} onChange={this.inputChange} name='aboutValue' value={aboutValue} placeholder='Tell us more about you...' />
				
			</Form.Field>
			<Form.Group widths='equal'>
				<Form.Field>
					<label>Email</label>
					<input ref={this.refEmail} value={emailValue} onChange={this.inputChange} name='emailValue' placeholder='example@example.com' />
				</Form.Field>
				<Form.Field>
					<label>User Name</label>
					<input ref={this.refUser} value={userValue} onChange={this.inputChange} name='userValue' placeholder='user123' />
				</Form.Field>
			</Form.Group>
			<br/>
			<Form.Field align="center">
				<Button onClick={() =>document.location.reload()}>
				  Limpar
				</Button>
				<Button onClick={() => this.exibe()}>
				  Concluir
				</Button>
			</Form.Field>
			<br/>
			{tabela}
	   </Form>
		
		<br/>
		{showTb}
        <h1>{newValue}</h1>
      </div>
	 </> 
    );
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue,
  showTb:   store.TableState.showTb,
  dados:    store.TableState.dados
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton, showTable, GuardaDados}, dispatch);


  
export default connect(mapStateToProps, mapDispatchToProps)(Home);