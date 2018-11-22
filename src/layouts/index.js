import css from './index.scss'

const BasicLayout = ({ children }) => {
  return (
    <div className={ css.basic }>
      { children }
    </div>
  );
}

export default BasicLayout
