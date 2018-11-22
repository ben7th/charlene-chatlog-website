import $api from '@/api/api'
import Link from 'umi/link'
import Iconfont from '../../../../components/Iconfont'
import css from './list.scss'
import classNames from 'classnames/bind'

export default class extends React.Component {
  state = {
    bundles: [],
    loaded: false
  }

  async componentDidMount () {
    await this.load()
    window.$$list = this
  }

  async load () {
    this.setState({ bundles: [], loaded: false })
    let { bundles } = await $api.bundle.all()
    // console.log(bundles)
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
      <Delete bundle={x} />
    </div>
  ))

  return (
    <div>
      {_bundles}
    </div>
  )
}

class Delete extends React.Component {
  state = {
    want: false
  }

  render () {
    let { want } = this.state

    let cn1 = classNames.bind(css)({
      del: true,
      disabled: want
    })

    let cn2 = [ css.del, css.confirm ].join(' ')

    let cn3 = css.del

    return (
      <>
      <a href='javascript:;' className={ cn1 }
        onClick={ evt => this.wantDelete() }
      >删除</a>
      {
        want ? (
          <>
            <a href='javascript:;' className={ cn3 }
              onClick={ evt => this.cancelDelete() }
            >还是算了吧</a>
            <a href='javascript:;' className={ cn2 }
              onClick={ evt => this.doDel() }
            >删除！</a>
          </>
        ) : null
      }
      </>
    )
  }

  wantDelete () {
    this.setState({ want: true })
  }

  cancelDelete () {
    this.setState({ want: false })
  }

  async doDel () {
    let { name } = this.props.bundle
    let res = await $api.bundle.deleteOne({ name })
    console.log(res)
    this.setState({ want: false })
    await window.$$list.load()
  }
}