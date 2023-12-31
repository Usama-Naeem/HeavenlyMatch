import { Form } from 'antd';
import { editableTableInputConfig } from '../enum';

export const EditableCell = ({
  editing,
  dataIndex,
  inputType,
  children,
  inputProps,
  ...restProps
}) => {
  const inputConfig = editableTableInputConfig(inputProps);
  let inputNode = inputConfig[inputType];

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} className="m-0" rules={inputProps?.rules}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
