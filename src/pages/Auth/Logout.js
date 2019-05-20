import React from 'react';


class App extends React.PureComponent {
  componentWillMount() {
    const { history } = this.props;
    history.replace('/login');
  }

  render = () => {
    return null;
  };
}

export default App;
