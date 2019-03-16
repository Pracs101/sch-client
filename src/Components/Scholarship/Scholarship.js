import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input'; 
import classes from './Scholarship.module.css';
import AddButton from '../../UI/Icons/AddButton/AddButton';
import axios from '../../Axios';
import Sch from './Sch/Sch';

class Scholarship extends Component {
  state = {
    category: '',
    schName: '',
    overview: '',
    criteria: [],
    criteriaF: '',
    type: '',
    value: '',
    benifits: '',
    link: '',
    docs: [],
    docF: '',
    schs: [],
    add: false
  }
  fetchSch = () => {
    axios.get('/scholership/schs')
      .then(schs => {
        this.setState({ schs: schs.data });
      });
  }
  componentDidMount() {
    this.fetchSch();
  }
  onClickAdd = () => {
    this.setState(prevState => {
      return { add: !prevState.add };
    });
  }
  onInputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  addCritera = () => {
    let criteria = this.state.criteria;
    criteria.push(this.state.criteriaF);
    this.setState({ criteria, criteriaF: '' });
  }
  addDoc = () => {
    let docs = this.state.docs;
    docs.push(this.state.docF);
    this.setState({ docs, docF: '' });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const body = {
      category: this.state.category,
      schName: this.state.schName,
      overview: this.state.overview,
      criteria: this.state.criteria,
      benifits: this.state.benifits,
      link: this.state.link,
      docs: this.state.docs,
      createdBy: localStorage.getItem('id')
    }
    axios.post('/scholership/add', body) 
      .then(r => {
        this.fetchSch();
        this.onClickAdd();
      })
  }
  render() {
    let ren = (
      <div>
        <div className={module.Button1} >
          <Button onClick={this.onClickAdd} >Add Scholarship</Button>
        </div>
        {this.state.schs.map((s, i) => {
          return (
            <Sch
              key={i} 
              category={s.category}
              schName={s.schName}
              overview={s.overview}
              criteria={s.criteria}
              benifits={s.benifits}
              link={s.link}
              docs={s.docs}
              duration={s.duration}
            />
          );
        })}
      </div>
    );
    if(this.state.add) {
      ren = (
        <div className={module.Form} >  
          <form method='POST' onClick={this.onSubmit} >
            <input type='text' placeholder='Enter Category' value={this.state.category} onChange={this.onInputChangeHandler} name='category' /> <br />
            <input type='text' placeholder='Enter Scholarship name' value={this.state.schName} onChange={this.onInputChangeHandler} name='schName' /> <br />
            <textarea placeholder='Overview' rows='4' cols='20' name='overview' value={this.state.overview} onChange={this.onInputChangeHandler} ></textarea> <br />
            {this.state.criteria.map((c, i) => {
              return (
                <div key={i} >
                  {c}
                </div>
              );
            })}
            <input type='text' placeholder='Enter criteria' value={this.state.criteriaF} onChange={this.onInputChangeHandler} name='criteriaF' /> 
            <AddButton onClick={this.addCritera} />
            <br />
            {this.state.docs.map((d, i) => {
              return (
                <div key={i} >
                  {d}
                </div>
              );
            })}
            <input type='text' placeholder='Enter document' value={this.state.docF} onChange={this.onInputChangeHandler} name='docF' /> 
            <AddButton onClick={this.addDoc} />
            <br />
            <textarea placeholder='benifits' rows='4' cols='20' name='benifits' value={this.state.benifits} onChange={this.onInputChangeHandler} ></textarea> <br />
            <input type='text' placeholder='Enter Link' value={this.state.link} onChange={this.onInputChangeHandler} name='link' /> <br />
            <Button>Add</Button>
          </form>
          <Button onClick={this.onClickAdd} >Back</Button>
        </div>
      );
    }
    return ren;
  }
}

export default Scholarship;

// ren = (
//   <div className={classes.mainDiv}>
//     <div className={classes.subDiv}>
//       <Input type="text" name="category" value={this.state.category} onChange={(e) => this.inputChangedHandler(e)} placeholder="Category"  required />
//       <Input type="text" name="schName" value={this.state.schName} onChange={(e) => this.inputChangedHandler(e)} placeholder="Scholarship Name"  required />
//       <div className={classes.textMainDiv}>
//         <input className={classes.textarea} rows='4' cols='50' type="textarea" name="overview" value={this.state.overview} onChange={(e) => this.inputChangedHandler(e)} placeholder="Overview"  required />
//       </div>
//       <div className={classes.criteria}>
//         <div className={classes.criInput}>
//           <input type="text" name="criteria" value={this.state.criteria} onChange={(e) => this.inputChangedHandler(e)} placeholder="Scholarship Name"  required />
//         </div>
//         <div className={classes.add} onClick={this.addCriteria}>
//           <AddButton />
//         </div>
//       </div>
//       <div className={classes.textMainDiv}>
//         <input className={classes.textarea} rows='4' cols='50' type="textarea" name="benifits" value={this.state.benifits} onChange={(e) => this.inputChangedHandler(e)} placeholder="Benefits"  required />
//       </div>
//       <div className={classes.docs}>
//         <div className={classes.docsInput}>
//           <input type="text" name="docs" value={this.state.docs} onChange={(e) => this.inputChangedHandler(e)} placeholder="Scholarship Name"  required />
//         </div>
//         <div className={classes.add} onClick={this.addDocs}>
//           <AddButton />
//         </div>
//       </div>
//       <Input type="text" name="link" value={this.state.link} onChange={(e) => this.inputChangedHandler(e)} placeholder="Link"  required />
//     </div>
//   </div>
// );