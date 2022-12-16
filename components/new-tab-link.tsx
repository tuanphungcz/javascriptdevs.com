export const NewTabLink: React.FC<any> = ({ children, ...other }) => {
  return (
    <a {...other} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default NewTabLink;
