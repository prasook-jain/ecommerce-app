interface HeaderProps {
  userDetails: Object;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { userDetails } = props;
  return <div>Hello</div>;
};

export default Header;
