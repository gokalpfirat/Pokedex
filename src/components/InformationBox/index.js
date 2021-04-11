import "./style.css";
const InformationBox = ({ children, ...props }) => (
  <div className="information_box" {...props}>
    {children}
  </div>
);
export default InformationBox;
