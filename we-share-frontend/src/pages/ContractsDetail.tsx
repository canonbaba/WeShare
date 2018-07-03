import * as React from 'react';
import * as FontAwesome from 'react-icons/lib/fa'
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
// tslint:disable-next-line:ordered-imports
import { IContracts, IParticipant, IJoinContractList } from 'src/models';
import { /*addContracts,*/ editContracts, remoteAddContracts /*remoteEditContracts*/ } from 'src/redux/contracts/actions';
import { IRootState } from 'src/redux/store';
// import { ContractsShow } from './ContractsShow';
import './css/ContractsDetail.css';

import {
 // Collapse,
 // Navbar,
 // NavbarToggler,
 // NavbarBrand,
 // Nav,
 // NavItem,
 // NavLink,

 Col,
 Row
 // Jumbotron
 // Row,
 // Button
} from 'react-bootstrap';


interface IContractsDetailProps {
 userid: number;
 match: match<{ id?: string }>;
 contracts: IContracts[];
 history: any;
 addContracts: (contracts: IContracts) => void;
 saveContractsProps: (contracts: IContracts) => void;
 joinContractList: IJoinContractList[];
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

class PureContractsDetail extends React.Component<IContractsDetailProps, IContractsDetailStates>{


 constructor(props: IContractsDetailProps) {

   super(props);

   this.state = {

     product: '',
     // tslint:disable-next-line:object-literal-sort-keys
     price: 0,

      participants: [
        { id: 1, participantName: '', percentage: '', dayToUse: '' },
        { id: 2, participantName: '', percentage: '', dayToUse: '' },
        { id: 3, participantName: '', percentage: '', dayToUse: '' },
        { id: 4, participantName: '', percentage: '', dayToUse: '' }],
      description: ''
    }

   if (this.props.match.params.id != null) {
     const contractId = parseInt(this.props.match.params.id, 10);
     const contract = this.props.contracts.find(c => c.id === contractId);
     if (contract != null) {
       this.state = {
         product: contract.product,
         // tslint:disable-next-line:object-literal-sort-keys
         price: contract.price,
         participants: contract.participants.slice(),
         description: contract.description
       };
     }
   }

 }

 public render() {

   const joinContractList = this.props.joinContractList.map((data: any, i: number) =>
     <option key={i} value={data.name}>{data.name}</option>
   )

   return (
     <div>

       <Row id="contractCreate">
         <Col lg={6} xs={6} id="contractLeft">

           <div>
             <div id="contractProduct">
               {/* <label>Product:</label> */}
               <input type="text" placeholder="Title" value={this.state.product} onChange={this.handleProductChange} />
             </div>

             <div id="contractPrice">
               <label>Price:</label>
               <input type="text" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange} />
             </div>

             <div id="contractParticipantTitle">The Participants</div>
             {
               this.state.participants.map(participant => (

                 <Row className="contractPeople" key={participant.id}>

                   <Col lg={3} xs={3} id="contractFontCol">
                     <div id="contractFont"><FontAwesome.FaUser /></div>
                   </Col>

                   <Col lg={9} xs={9} id="contractParticipantContent">
                     <div>
                       <select onChange={this.handleParticipantsNameChange.bind(this, participant.id)}>
                         <option value="" >Please Select</option>
                         {joinContractList}
                       </select>
                     </div>


                     <div id="contractPercentage">
                       {/* <label>Percentage:</label> */}
                       <input type="number" placeholder="Percentage" value={participant.percentage} onChange={this.handlePercentagesChange.bind(this, participant.id)} />
                       <label>%</label>
                     </div>

                     <div>
                       {/* <label>Day To Use:</label> */}
                       <input type="text" placeholder="Which day will use?" value={participant.dayToUse} onChange={this.handleDay.bind(this, participant.id)} />
                     </div>

                   </Col>
                 </Row>
               ))

             }


             <div className="contractDescription">
               {/* <label>Description:</label> */}
               <textarea placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange} />
             </div>

             <div id="contractButton">
               <button onClick={this.handleSubmit}>SUBMIT</button>
             </div>

           </div>


         </Col>

         <Col lg={6} xs={6}>


           <div>

             {/* <div id="confirmTitle"> The Created Contract </div> */}

             {

               (this.props.contracts) ? (
                 this.props.contracts.map(contract => (

                   <div id="confiremContract" key={contract.id}>


                     <div id="confirmProductAndPrice">
                       <label>The Product: </label>
                       <div> {contract.product} </div>
                     </div>

                     <div id="confirmProductAndPrice">
                       <label>The Price: </label>
                       <div> {contract.price} </div>
                     </div>

                     <div>
                       {
                         contract.participants.map(participant => (

                           <div id="confirmParticipant" key={participant.id}>

                             <div id="confirmParticipantGroup">
                               <label>The participant: </label>
                               <div> {participant.participantName}</div>
                             </div>
                             <div id="confirmParticipantGroup">
                               <label>Percentage: </label>
                               <div>{participant.percentage}</div>
                             </div>
                             <div id="confirmParticipantGroup">
                               <label>Which day will use: </label>
                               <div>{participant.dayToUse}</div>
                             </div>



                           </div>

                         ))
                       }

                     </div>

                     <div id="confiremDescription">
                       <label>Description:</label>
                       <div> {contract.description} </div>
                     </div>

                     <div id="confirmButton">
                       <button onClick={this.handleButton}>FINISH</button>
                     </div>


                   </div>
                 ))) : ''
             }

           </div>


         </Col>
       </Row>



     </div >


   );
 }

 private handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

   if (this.props.match.params.id != null) {

     this.props.saveContractsProps({
       id: parseInt(this.props.match.params.id, 10),
       product: this.state.product,
       // tslint:disable-next-line:object-literal-sort-keys
       price: this.state.price,
       participants: this.state.participants,
       description: this.state.description,
       userid: this.props.userid

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
   this.props.history.push('/profile')
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



 private handleParticipantsNameChange = (participantId: number, e: React.ChangeEvent<HTMLInputElement>) => {
   const participants = this.state.participants.slice();

   const participant = participants.find(p => p.id === participantId);

   if (participant != null) {
     participant.participantName = e.target.value;
     this.setState({
       participants
     });

   }
 }




 private handlePercentagesChange = (participantId: number, e: React.ChangeEvent<HTMLInputElement>) => {
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






 private handleDay = (participantId: number, e: React.ChangeEvent<HTMLInputElement>) => {
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

const ContractsDetail = connect((rootState: IRootState) => ({
 userid: rootState.islogin.userid,
 // tslint:disable-next-line:object-literal-sort-keys
 contracts: rootState.contracts.contracts,
 joinContractList: rootState.joinContractList.joinContractList

}), (dispatch: any) => ({

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

