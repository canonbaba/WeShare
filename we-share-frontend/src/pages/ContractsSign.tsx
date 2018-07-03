

import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import { IProfileContractData } from 'src/models';
import { fetchContracts, fetchSignContract, ILoadContractsData } from 'src/redux/contractsSign/actions';
import { IRootState } from 'src/redux/store';
import './css/ContractSign.css';


interface IContractsSignProps {
  userid: number;
  contractId: number;
  profileContract: IProfileContractData[];
  onloadContracts: (contractId: number) => void;
  loadContracts: ILoadContractsData[];
  signContract: (sign: ISignResult) => void;
}

interface IContractsSignState {
  agree: boolean;
  disagree: boolean;
}

interface ISignResult {

  agree: boolean;
  disagree: boolean;
  contractId: number;
  userid: number;

}

class PureContractsSign extends React.Component<IContractsSignProps, IContractsSignState> {

  constructor(props: IContractsSignProps) {
    super(props);

    this.state = {
      agree: false,
      disagree: false
    }
  }

  public componentWillMount() {
    this.props.onloadContracts(this.props.contractId);
  }

  public render() {

    const loadContract = this.props.loadContracts.map((data: any, i: number) => {
      return <div key={i} className="contractSign">
        <h3>The Contract To Be Signed </h3>
        <h5>Title: {data.productName}</h5>
        <h5>Price: {data.price}</h5>
        <div id="signParticipant">{data.participants.map((data2: any, i2: number) => {

          // tslint:disable-next-line:no-unused-expression
          return <div key={i} id="sign_participant">
            <Col xs={6}>
              <h6>Name: {data2.name}</h6>
              <h6>Price To Share: {data2.percentageToShare} %</h6>
              <h6>Day To Use: {data2.daysToUse}</h6>
            </Col>
          </div>
        })
        }
        </div>
        <h6>Description: {data.description}</h6>
      </div>
    })

    return (
      <div>

        {loadContract}

        {
          (this.props.loadContracts) ? (
            <div id='sign_agree_clickbox'>

                <span><label>Agree</label><input type="checkbox" checked={this.state.agree} onChange={this.handleAgreeChange} /></span>
                <span><label>Disagree</label><input type="checkbox" checked={this.state.disagree} onChange={this.handleDisagreeChange} /></span>

            </div>
          ) : ''
        }
        <div id="contractSignbutton">
        <Link id="contractSignbutton" to={'/profile'}>
          <button onClick={this.handleSign} className="static-modal contractSign">Sign</button>
        </Link>
        </div>
      </div>
    )
  }




  private handleSign = (e: React.MouseEvent<HTMLButtonElement>) => {

    this.props.signContract({

      agree: this.state.agree,
      disagree: this.state.agree,
      // tslint:disable-next-line:object-literal-sort-keys
      contractId: this.props.contractId,
      userid: this.props.userid

    });

  }




  private handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.checked) {
    //   // tslint:disable-next-line:no-unused-expression
    //   this.state.disagree === false
    // }
    // this.setState({
    //   agree: e.target.checked
    // });

    this.setState({
      agree: e.target.checked,
      disagree: false
    });
  }


  private handleDisagreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.checked) {
    //   // tslint:disable-next-line:no-unused-expression
    //   this.state.agree === false
    // }

    this.setState({
      disagree: e.target.checked,
      // tslint:disable-next-line:object-literal-sort-keys
      agree: false
    });
  }


}



const mapStateToProps = (rootState: IRootState, ownProps: { match: match<{ id?: number }> }) => {
  const contract = rootState.profileContract.profileContract.find(c => {
    return c.contractId === Number(ownProps.match.params.id)
  })
  return {
    // profileContract:rootState.profileContract.profileContract,
    // tslint:disable-next-line:object-literal-sort-keys
    contractId: (contract !== undefined) ? contract.contractId : undefined,
    loadContracts: rootState.loadContracts.loadContracts,
    userid: rootState.islogin.userid,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onloadContracts: (contractId: number) => dispatch(fetchContracts(contractId)),
    signContract: (sign: ISignResult) => dispatch(fetchSignContract(
      sign.agree,
      sign.disagree,
      sign.contractId,
      sign.userid))
  };
}

const ContractsSign = connect(mapStateToProps, mapDispatchToProps)(PureContractsSign);

export default ContractsSign;