import { Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getAticleChannels } from '@/store/Actions'
const { Option } = Select
const Channel = ({ value, onChange, width }) => {
  const { channels } = useSelector((state) => state.article)
  const dispatch = useDispatch()
  //  调度获取分章分类列表的action
  dispatch(getAticleChannels())
  return (
    <Select
      value={value}
      onChange={onChange}
      style={{ width }}
      placeholder="请选择所属频道"
    >
      {channels.map((item) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  )
}
export default Channel
