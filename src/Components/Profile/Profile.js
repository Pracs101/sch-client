import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './Profile.css';
import ProfileIcon from '../../UI/ProfileIcon/ProfileIcon';
import axios from '../../Axios';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import Spinner from '../../UI/Spinner/Spinner';
import AddIcon from '../../UI/Icons/AddButton/AddButton';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

class Profile extends Component {
    state = {
        user: null,
        loading: true,
        dob: '',
        state: '',
        religion: '',
        caste: '',
        income: '',
        isNRI: '',
        degreeName: '',
        schoolName: '',
        percentage: '',
        passYear: '',
        isKt: '',
        education: []
    }
    componentDidMount () {
        const id = localStorage.getItem('id');
        axios.get('/user/profile/data/' + id)
            .then(res => {
                console.log(res.data);
                if(res) {
                    this.setState({user: res.data, loading: false});
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    inputChangedHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }
      onAddEdu = () => {
          let education = this.state.education;
          education.push({
            degreeName: this.state.degreeName,
            schoolName: this.state.schoolName,
            percentage: this.state.percentage,
            passYear: this.state.passYear,
            isKt: this.state.isKt
          });
          this.setState({ education, degreeName: '', schoolName: '', percentage: '', passYear: '', isKt: '' });
      }
      onSubmitForm = (e) => {
          e.preventDefault();
          const body = {
              profile: {
                dob: this.state.dob,
                state: this.state.state,
                religion: this.state.religion,
                caste: this.state.caste,
                income: this.state.income,
                isNRI: this.state.isNRI
              },
              education: this.state.education,
              userID: localStorage.getItem('id')
          }
          this.setState({ loading: true });
          axios.post('/user/profile', body)
            .then(user => {
                console.log(user.data)  ;
                
                this.setState({ user: user.data, loading: false });
            })
      }
    render () {
        let profile = null;
        let extra = null;
        if(this.state.user) {
            profile = (
                <div className={classes.ProfileMainDiv}>
                    <div className={classes.ProfileSubDiv}>
                        <div className={classes.Profiletag}>Your Profile</div>
                        <div className={classes.ProfileData}>
                            <div className={classes.Flexing}>
                                <div className={classes.heading}>Email Id:</div>
                                <div className={classes.content}>{this.state.user.email}</div>
                            </div>
                            <div className={classes.Flexing}>
                                <div className={classes.heading}>First Name:</div>
                                <div className={classes.content}>{this.state.user.fname}</div>
                            </div>
                            <div className={classes.Flexing}>
                                <div className={classes.heading}>Last Name:</div>
                                <div className={classes.content}>{this.state.user.lname}</div>
                            </div>
                            <div className={classes.Flexing}>
                                <div className={classes.heading}>Contact Number:</div>
                                <div className={classes.content}>{this.state.user.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            if(this.state.user.profile) {
                extra = (
                    <div>
                    <div className={classes.ProfileMainDiv}>
                        <div className={classes.ProfileSubDiv}>
                            <div className={classes.Profiletag}>Personal Information</div>
                            <div className={classes.ProfileData}>
                                <div className={classes.Flexing}>
                                    <div className={classes.heading}>Date Of Birth:</div>
                                    <div className={classes.content}>{this.state.user.profile.dob}</div>
                                </div>
                                <div className={classes.Flexing}>
                                    <div className={classes.heading}>Caste Category:</div>
                                    <div className={classes.content}>{this.state.user.profile.caste}</div>
                                </div>
                                <div className={classes.Flexing}>
                                    <div className={classes.heading}>Annual Income:</div>
                                    <div className={classes.content}>{this.state.user.profile.income}</div>
                                </div>
                                <div className={classes.Flexing}>
                                    <div className={classes.heading}>is NRI:</div>
                                    <div className={classes.content}>{this.state.user.profile.isNRI ? 'Yes' : 'No'}</div>
                                </div>
                                <div className={classes.Flexing}>
                                    <div className={classes.heading}>Religion:</div>
                                    <div className={classes.content}>{this.state.user.profile.religion}</div>
                                </div>
                                <div className={classes.Flexing}>
                                    <div className={classes.heading}>State:</div>
                                    <div className={classes.content}>{this.state.user.profile.state}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.ProfileMainDiv}>
                        <div className={classes.ProfileSubDiv}>
                            <div className={classes.Profiletag}>Education Details</div>
                            {this.state.user.education.map((e, i)=>{
                                return (
                                    <div className={classes.ProfileData}>
                                        <div className={classes.FlexingTitle}>
                                            <div className={classes.heading}>Degree name:</div>
                                            <div className={classes.content}>{e.degreeName}</div>
                                        </div>
                                        <div className={classes.Flexing}>
                                            <div className={classes.heading}>is KT:</div>
                                            <div className={classes.content}>{e.isKt ? 'Yes' : 'No'}</div>
                                        </div>
                                        <div className={classes.Flexing}>
                                            <div className={classes.heading}>Passing Year:</div>
                                            <div className={classes.content}>{e.passYear}</div>
                                        </div>
                                        <div className={classes.Flexing}>
                                            <div className={classes.heading}>Aggregate %:</div>
                                            <div className={classes.content}>{e.percentage}</div>
                                        </div>
                                        <div className={classes.Flexing}>
                                            <div className={classes.heading}>School/College Name:</div>
                                            <div className={classes.content}>{e.schoolName}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                    </div>
                )
            } else {
                extra = (
                    <div>
                        <div className={classes.ProfileMainDiv}>
                        <div className={classes.ProfileSubDiv}>
                        <div className={classes.Profiletag}>Build your profile</div>
                        <form method='POST' onSubmit={this.onSubmitForm} >
                            <Input width='80%' height='0.1%' type="text" value={this.state.dob} onChange={(event) => this.inputChangedHandler(event)} placeholder="Date Of Birth (dd-mm-yyyy)" name="dob" required />
                            <Input width='80%' height='0.1%' type="text" value={this.state.state} onChange={(event) => this.inputChangedHandler(event)} placeholder="State" name="state" required />
                            <Input width='80%' height='0.1%' type="text" value={this.state.religion} onChange={(event) => this.inputChangedHandler(event)} placeholder="Religion" name="religion" required />
                            <Input width='80%' height='0.1%' type="text" value={this.state.caste} onChange={(event) => this.inputChangedHandler(event)} placeholder="Caste Category" name="caste" required />
                            <Input width='80%' height='0.1%' type="text" value={this.state.income} onChange={(event) => this.inputChangedHandler(event)} placeholder="Annual Income" name="income" required />
                            <Input width='80%' height='0.1%' type="text" value={this.state.isNRI} onChange={(event) => this.inputChangedHandler(event)} placeholder="is NRI" name="isNRI" required />
                            {this.state.education.map((e, i) => {
                                return (
                                    <div key={i} >
                                        {e.degreeName}
                                        {e.schoolName}
                                        {e.percentage}
                                        {e.passYear}
                                        {e.isKt}
                                    </div>   
                                )
                            })}
                            <div className={module.Group}>
                                <Input width='80%' height='0.1%' type="text" value={this.state.degreeName} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your degreeName" name="degreeName"  />
                                <Input width='80%' height='0.1%' type="text" value={this.state.schoolName} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your schoolName" name="schoolName"  />
                                <Input width='80%' height='0.1%' type="text" value={this.state.percentage} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your percentage" name="percentage"  />
                                <Input width='80%' height='0.1%' type="text" value={this.state.passYear} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your passYear" name="passYear"  />
                                <Input width='80%' height='0.1%' type="text" value={this.state.isKt} onChange={(event) => this.inputChangedHandler(event)} placeholder="Your isKt" name="isKt"  />
                                <AddIcon onClick={this.onAddEdu} />
                            </div>
                            <Button>Submit</Button>
                        </form>
                    </div>
                    </div>
                    </div>
                );
            }
        }
        if (this.state.loading) {
            profile = <Spinner />;
        }
        return (
            <div>
                {/* <ProfileIcon /> */}
                {profile}
                {extra}
            </div>
        );
    }
}

export default withErrorHandler(withRouter(Profile), axios);

// let profile = (
//     <div className={classes.ProfileDesc}>
//         <div className={classes.Nameh1}>
//             <p style={{
//                 textTransform: 'capitalize'
//             }}>{name}</p>
//         </div>
//         <p style={{
//             textTransform: 'capitalize'
//         }}className={classes.ProfileDescMore}>{dept} Engineering</p>
//         <hr width="50%"></hr>
//         <p className={classes.ProfileDescMore}>{this.state.user.sapid}</p>
//         <hr width="50%"></hr>
//         <p className={classes.ProfileDescMore}>{this.state.user.email}</p>
//     </div>
// );