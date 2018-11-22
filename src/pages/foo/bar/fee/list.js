import $api from '@/api/api'
import Link from 'umi/link'
import Iconfont from '../../../../components/Iconfont'
import css from './list.scss'

export default class extends React.Component {
  state = {
    bundles: [],
    loaded: false
  }

  async componentDidMount () {
    let { bundles } = await $api.bundle.all()
    console.log(bundles)
    this.setState({ bundles, loaded: true })
  }

  render () {
    return (
      <>
        <h3 className={ css.uploadlink }>
          <Link to='./upload'>上传文件戳这里</Link>
          <Iconfont name='arrowlefticon' />
        </h3>
        <h3>excel files:</h3>
        {
          this.state.loaded ?
            <List bundles={ this.state.bundles } />
            :
            <div className={ css.loading }>now loading ... <Iconfont.Loading /></div>
        }
      </>
    )
  }
}

const List = ({ bundles }) => {
  let _bundles = bundles.map((x, idx) => (
    <div key={idx}>
      <Link to={`./bundles/${x.name}`}>{x.name}</Link>
    </div>
  ))

  return (
    <div>
      {_bundles}
    </div>
  )
}