import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton, showTable} from './actions';
import { Button, Checkbox, Form, Table} from 'semantic-ui-react'
import './App.scss';

class App extends Component {
	constructor(props){
		super(props);
		
		//refs
		this.refNome = React.createRef();
	}
	state = {
		nomeValue: '',
		nomeValue2: ''
	}  
  
    inputChange = event => {
     this.setState({
       nomeValue: event.target.value
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
			this.props.showTable(true);
		}
	}

  
  render() {
    const {
      clickButton,
      newValue,
	  showTable,
	  showTb
	  
    } = this.props;    
	
	const { nomeValue } = this.state;   
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
		  <Table.Row>
			<Table.Cell>{nomeValue}</Table.Cell>
			<Table.Cell>Approved</Table.Cell>
			<Table.Cell>Shorter description</Table.Cell>
		  </Table.Row>
		</Table.Body>
	  </Table>;
	} 
	  
	return (
      <div className="App" style={{ paddingTop: '10px' }}>
        <Form>
			<Form.Field>
			  <label>Nome</label>
			  <input onChange={this.inputChange} ref={this.refNome} type='text' value={nomeValue}/>
			</Form.Field>
			<Form.Field>
				<Form.TextArea label='About' onChange={this.inputValor2Change} placeholder='Tell us more about you...' />
			</Form.Field>
			<Form.Group widths='equal'>
				<Form.Input fluid label='Email:' placeholder='example@example.com' />
				<Form.Input fluid label='User Name:' placeholder='user123' />
			</Form.Group>
			
			<Form.Field>
			  <Checkbox label='I agree to the Terms and Conditions' />
			</Form.Field>
			<Form.Field>
				<Button onClick={() =>document.location.reload()}>
				  Limpar
				</Button>
				<Button onClick={() => clickButton(nomeValue)}>
				  Concluir
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
    );
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue,
  showTb:   store.TableState.showTb
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton, showTable}, dispatch);


  
export default connect(mapStateToProps, mapDispatchToProps)(App);