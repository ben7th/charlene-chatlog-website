import Iconfont from '../../../../components/Iconfont'
import css from './upload.scss'
import Link from 'umi/link'

export default class extends React.Component {
  state = {
    file: null,
    result: null,
    uploading: false
  }

  onChange (evt) {
    let file = evt.target.files[0] 
    console.log({ file, s: btoa(file) })
    this.setState({ file }, () => {
      this.upload()
    })
  }

  upload () {
    let url = 'https://1246105.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/charlene-chatlog/upload/'

    let formData = new FormData()
    formData.append('file', this.state.file)

    this.setState({ uploading: true })
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ 
          uploading: false,
          result: res.res
        })
      })
      .catch(err => console.log(err))
  }

  render () {
    if (this.state.uploading) {
      return (
        <div className={ css.uploading }>
          正在上传 { this.state.file.name } ... <Iconfont.Loading />
        </div>
      )
    }

    let { result } = this.state
    let _result = null
    if (result) {
      _result = (
        <div className={ css.uploaded }>
          <span>上传完辣 🌶，创建了 { result.dialogs } 组，{ result.items } 条对话</span><br />
          <Link to={ `./bundles/${ this.state.file.name }` }>让我康康</Link>
        </div>
      )
    }

    return (
      <div className={ css.uploadform }>
        { _result }
        <div className={ css.upload }>
          <input type='file' onChange={ evt => this.onChange(evt) } />
          选择要上传的 excel 文件
        </div>
        <div>会自动帮你导入数据库喔</div>
      </div>
    )
  }
}