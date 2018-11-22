import css from '@/assets/iconfont/iconfont.css'
import css1 from './Iconfont.scss'

class Iconfont extends React.Component {
  render () {
    let { name, onClick } = this.props

    return (
      <i className={ `${ css.iconfont } ${ css[`icon-${name}`]}` } onClick={ onClick } />
    )
  }
}

Iconfont.Loading = () =>
  <span className={ css1['icon-loading'] }>
    <Iconfont name='loading' />
  </span>

export default Iconfont