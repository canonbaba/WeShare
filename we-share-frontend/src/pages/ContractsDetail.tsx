import * as React from 'react';
import { connect } from 'react-redux';
import {match} from 'react-router-dom';
// tslint:disable-next-line:ordered-imports
import { IContracts, IParticipant } from 'src/models';
import { /*addContracts,*/ editContracts,remoteAddContracts /*remoteEditContracts*/ } from 'src/redux/contracts/actions';
import { IRootState } from 'src/redux/store';
// import { ContractsShow } from './ContractsShow';

import {
  // Collapse,
  // Navbar,
  // NavbarToggler,
  // NavbarBrand,
  // Nav,
  // NavItem,
  // NavLink,

  Col,
  Container,
  Jumbotron
  // Row,
  // Button
} from 'reactstrap';


interface IContractsDetailProps{
  userid: number;
  match:match<{id?:string}>;
  contracts:IContracts[];
  history:any;
  addContracts:(contracts:IContracts)=> void;
  saveContractsProps:(contracts:IContracts)=> void;

}

interface IContractsDetailStates {

  product: string;
  price: number;
  participants: IParticipant[];
  description: string;

}


// export interface IParticipant {
    
//   id:number;
//   participantName:string;
//   percentage:string;
//   dayToUse:{
//   mon:boolean;
//   tue:boolean;
//   wed:boolean;
//   thur:boolean;
//   fri:boolean;
//   sat:boolean;
//   sun:boolean;
//   }
  
//   }

class PureContractsDetail extends React.Component <IContractsDetailProps,IContractsDetailStates>{


  constructor(props: IContractsDetailProps) {

    super(props);

    this.state = {

      product: '',
      // tslint:disable-next-line:object-literal-sort-keys
      price: 0,

      participants: [{ id: 1, participantName: '',percentage:'', dayToUse:''},{ id: 2, participantName: '',percentage: '',dayToUse:''},{ id: 3, participantName: '',percentage: '',dayToUse:''},{ id: 4, participantName: '',percentage: '',dayToUse:''}],
                  
      description: ''

    }

   if(this.props.match.params.id !=null){

        const contractId = parseInt(this.props.match.params.id,10);
        const contract = this.props.contracts.find(c => c.id === contractId);
        if(contract!=null){

          this.state = {

            product: contract.product,
            // tslint:disable-next-line:object-literal-sort-keys
            price: contract.price,

            participants: contract.participants.slice(),
           
            description:contract.description
            
            };
        }

   }
  }



  public render (){
    return (
      <div>
            {/* ContractsDetail
            <h2> {this.props.match.params.id != null ? 'Editing Contracts':'Creating Contracts'}</h2> */}

      
<Jumbotron>
      <Container>
        <Col xl="6">

        <div>

        <div>
          <label>Product:</label>
          <input type="text" value={this.state.product} onChange={this.handleProductChange} />
        </div>

         <div>
          <label>Price:</label>
          <input type="text" value={this.state.price} onChange={this.handlePriceChange} />
        </div>

          <label>The Participants:</label>
          {
            this.state.participants.map(participant => (

              <div key={participant.id}>

                <div>

                  <label>Name:</label>
                  <input type="text" value={participant.participantName} onChange={this.handleParticipantsNameChange.bind(this, participant.id)} />
                </div>

                  <div>

                      <label>Percentage:</label>
                      <input type="text" value={participant.percentage} onChange={this.handlePercentagesChange.bind(this, participant.id)} />
                      <label>%</label>
                    </div>

                    <div>

                      <label>Day To Use:</label>
                      
                      <input type="text" value={participant.dayToUse} onChange={this.handleDay.bind(this, participant.id)} />
                   </div>

              </div>
            ))

          }

        

        <div >
          <label>Description:</label>
          <textarea placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
        </div> 
        
             <button onClick={this.handleSubmit}>Submit</button>

        </div>


        </Col>

        <Col xl="6">
         
         
         <div>

          <div> The Created Contract </div>

            {

          (this.props.contracts) ? (
            this.props.contracts.map(contract => (

             <div key={contract.id}>
  

              <div>
                <label>The Product:</label>
                <div> {contract.product} </div>
              </div>

              <div>
                <label>Price:</label>
                <div> {contract.price} </div>
              </div>

              <div>
              {
                contract.participants.map(participant => (

                <div key={participant.id}>


                 <div><label>The participant</label> {participant.participantName}</div>
                 <div><label>percentage</label>{participant.percentage}</div>
                 <div><label>day to use</label>{participant.dayToUse}</div>
              
                           
  
                </div>

                ))
              }

              </div>
    
              <div >
                <label>Description:</label>
                <div> {contract.description} </div>
              </div>
                
              <button onClick={this.handleButton}>Go Back To Contracts List</button>
             
    
            </div>
            ))): ''
        }

        </div>
             
        
        </Col>
      
    </Container>
</Jumbotron>
      
      
      </div>


    );
  }

  private handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

    if(this.props.match.params.id !=null){

      this.props.saveContractsProps({
        id: parseInt(this.props.match.params.id,10),
        product: this.state.product,
        // tslint:disable-next-line:object-literal-sort-keys
        price: this.state.price,
        participants: this.state.participants,
        description: this.state.description,
        userid:this.props.userid
       
      })
        // this.props.history.push('/contracts')
    } else {

      this.props.addContracts({
        id: 0,
        product: this.state.product,
        // tslint:disable-next-line:object-literal-sort-keys
        price: this.state.price,
        participants: this.state.participants,
        description: this.state.description,
        userid: this.props.userid

      })
        // this.props.history.push('/contracts')
    
    }
  }

  private handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.props.history.push('/contracts')
  }

  private handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      product: e.target.value
    });
  }

  private handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.price != null && !isNaN(parseInt(e.target.value, 10))) {
      this.setState({
        // tslint:disable-next-line:radix
        price: parseInt(e.target.value, 10)
      });
    }
  }



  private handleParticipantsNameChange = (participantId:number, e: React.ChangeEvent<HTMLInputElement>) => {
    const participants = this.state.participants.slice();

    const participant = participants.find(p => p.id === participantId);

    if (participant != null) {
      participant.participantName = e.target.value;
      this.setState({
        participants
      });

    }
  }

 

 
  private handlePercentagesChange = (participantId:number, e: React.ChangeEvent<HTMLInputElement>) => {
    const participants = this.state.participants.slice();

    const participant = participants.find(p => p.id === participantId);

    // tslint:disable-next-line:use-isnan
    if (participant != null) {

      participant.percentage = e.target.value

      this.setState({
        participants
      });
    }
    }
  
  
    



  private handleDay = (participantId:number, e: React.ChangeEvent<HTMLInputElement>) => {
    const participants = this.state.participants.slice();

    const participant = participants.find(p => p.id === participantId);

    if (participant != null) {

      participant.dayToUse = e.target.value;
      this.setState({
        participants
      });

    }
  }


  private handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      description: e.target.value
    });
  }

}

const ContractsDetail = connect((rootState:IRootState) =>({

   userid: rootState.islogin.userid,

   contracts:rootState.contracts.contracts
  

}),(dispatch:any)=> ({

  addContracts: (contracts: IContracts) => {
    dispatch(remoteAddContracts(
    contracts.id,
    contracts.product,
    contracts.price,
    contracts.participants,
    contracts.description,
    contracts.userid
  ))
    },
    saveContractsProps: (contracts: IContracts) => {
    dispatch(editContracts(
    contracts.id,
    contracts.product,
    contracts.price,
    contracts.participants,
    contracts.description,
    contracts.userid
   
  ))
    },
    
    }))(PureContractsDetail);

// tslint:disable-next-line:no-unused-expression
export default ContractsDetail;


