import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component{
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render(){
    const { fields: { title, categories, content }, handleSubmit } =this.props;

    return(
      <div className="modal fade" id="myModalNorm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span> <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
                    Create a New Post
              </h4>
            </div>
            <div className="modal-body">
              <form
                role="modal"
                 onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                  <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                   <div className="text-help">
                     {title.touched ? title.error : ''}
                   </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                  <label>Categories</label>
                  <input type="text" className="form-control" {...categories} />
                  <div className="text-help">
                    {categories.touched ? categories.error : ''}
                  </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                  <label>Content</label>
                  <textarea className="form-control" {...content} />
                  <div className="text-help">
                    {content.touched ? content.error : ''}
                  </div>
                </div>
                  <button type="submit" className="btn btn-primary btn-b" >Submit</button>
                <button className="btn btn-danger btn-r" data-dismiss="modal">Cancel</button>
              </form>
            </div>
          </div>
       </div>
     </div>
    )
  }
}

function validate(values){
  const errors = {};

  if(!values.title) {
    errors.title ='Enter a title';
  }
  if(!values.categories) {
    errors.categories = 'Enter a category';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

//connect: first agument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);

//user types somthing in...record
