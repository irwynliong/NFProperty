import React from 'react';

class BidsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: '',
      item_id: '',
      price: 0
    };
  }

  componentDidMount() {
    // You can perform any necessary setup or fetch initial data here
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions like saving the bid to the database
    // You can use AJAX requests, or if you have a backend server, make API calls to it
    // For simplicity, this example just logs the bid data to the console
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h2>Bid Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <input
              type="text"
              name="user_id"
              value={this.state.user_id}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Item ID:
            <input
              type="text"
              name="item_id"
              value={this.state.item_id}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Submit Bid</button>
        </form>
      </div>
    );
  }
}

export default BidsComponent;