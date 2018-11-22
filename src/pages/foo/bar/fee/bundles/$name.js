import css from './$name.scss'
import $api from '@/api/api'
import moment from 'moment'

import Iconfont from '@/components/Iconfont'
import Link from 'umi/link'

export default class extends React.Component {
  state = {
    dialogs: [],
    loaded: false
  }

  async componentDidMount () {
    let { name } = this.props.match.params
    let { dialogs } = await $api.bundle.dialogsOfName(name)
    this.setState({ dialogs, loaded: true })
  }

  render () {
    let { name } = this.props.match.params

    let _dialogs = this.state.dialogs.map((d, idx) => (
      <Dialog key={idx} data={ d } />
    ))

    let _loading = (
      <div className={ css.loading }>
        <span>now loading ... </span><Iconfont.Loading />
      </div>
    )

    return (
      <div className={ css.bundle }>
        <Head name={ name }/>
        
        <div className={ css.main }>
          <div className={ css.container }>
            <div className={ css.back }>
              <Link to='../list'>返回</Link>
            </div>
            {
              this.state.loaded ?
                _dialogs : _loading      
            }
          </div>
        </div>
      </div>
    )
  }
}

const Head = ({ name }) => (
  <div className={ css.head }>
    <div className={ css.container }>
      data import from: {name}
    </div>
  </div>
)

class Dialog extends React.Component {
  state = {
    fold: false
  }

  componentDidMount () {
    // console.log(this.props.data._id)
    let key = `fold-${ this.props.data._id }`
    let fold = JSON.parse(localStorage.getItem(key))
    this.setState({ fold })
  }

  render () {
    let { data } = this.props
    let { fold } = this.state

    let _typeStr = data.type === 'single' ? '单独对话' : '群组对话'
    let _type =  <span>{ _typeStr } - { data.group }</span>

    let _items = data.items.map((x, idx) => (
      <Item key={idx} data={x} />
    ))

    let _fold = fold ?
      (
        <span className={ css.fold } onClick={ evt => this.toggleFold() }>展开</span>
      ) : (
        <span className={ css.fold } onClick={ evt => this.toggleFold() }>折叠一下啦</span>
      )

    return (
      <div className={ css.dialog }>
        <div className={ css.type }>
          { _type }
          { _fold }
        </div>
        {
          fold ? null : <div className={ css.items }>{ _items }</div>
        }
      </div>
    )
  }

  toggleFold () {
    let { fold } = this.state
    fold = !fold
    this.setState({ fold })

    let key = `fold-${ this.props.data._id }`
    localStorage.setItem(key, JSON.stringify(fold))
  }
}

class Item extends React.Component {
  state = {
    star: false
  }

  componentDidMount () {
    this.setState({ star: !!this.props.data.star })
  }

  render () {
    let { data } = this.props

    let time = moment(data.time).format('YYYY-MM-DD HH:mm:ss')
    let type = <span className={css.mtype}>{data.mtype}</span>

    let ct
    let className
    if (data.mtype == 'application/cyfile') {
      className = `${css.chatitem} ${css.file}`
      ct = (
        <span>下载：<a className={ css.download } href={data.mtext} target='_blank'>{data.filename}</a></span>
      )
    } else {
      className = `${css.chatitem}`
      ct = (
        <pre>
          {data.mtext}
        </pre>
      )
    }

    let starClassName = this.state.star ? css.ON : css.OFF

    return (
      <div className={ css.cibox }>
        <span className={ css.sender }>{ data.sender } {time} {type}</span>
        <div className={ className }>
          <div className={ `${ css.star } ${ starClassName }` } onClick={ evt => this.toggleStar() }>
            <Iconfont name='star' />
          </div>
          { ct }
        </div>
      </div>
    )
  }

  async toggleStar () {
    let oldStar = this.state.star
    let itemId = this.props.data._id
    let res = await $api.bundle.starChatItem({ itemId, star: !oldStar })
    console.log(res)
    this.setState({ star: res.chatitem.star })
  }
}