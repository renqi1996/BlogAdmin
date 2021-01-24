import React, { useState } from 'react';
import marked from 'marked';
import '../../static/css/article/addArticle.css';
import { Row, Col, Input, Select, Button, Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '../../static/css/article/markdown.scss';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle: React.FC<{}> = () => {

  const [articleID, setArticleID] = useState<number>(0); // 文章ID，0-新增 非0-编辑
  const [articleTitle, setArticleTitle] = useState<string>(''); // 文章标题
  const [articleContent, setArticleContent] = useState<string>(''); // 文章内容
  const [mdContent, setMdContent] = useState<string>(''); // markdown 编辑内容
  const [introductionMD, setIntroductionMd] = useState<string>(''); // 文章简介
  const [typeInfo, setTypeInfo] = useState<Array<number>>([]); // 文章类型
  const [selectedType, setSelectedType] = useState<number>(1); // 文章类型
  const [imageUrl, setImgUrl] = useState<string>(''); // cover 图片
  const [imgLoading, steImgLoading] = useState<boolean>(false); // 图片是否正在上传

  const [previewVisible, setPreviewVisible] = useState<boolean>(false); // 图片预览是否可见
  const [previewTitle, setPreviewTitle] = useState<string>(''); // 图片预览名称
  
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: true,
    smartLists: true,
    smartypants: false,
  });

  const ContenChange = (e: any): void => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMdContent(html);
  };

  const IntroductionChange = (e: any): void => {
    setIntroductionMd(e.target.value);
  }

  const uploadButton = (
    <div style={{ width: '100%' }}>
      {imgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Cover here</div>
    </div>
  );

  return <div>
    <Row gutter={10}>
      <Col span={18}>
        <Row gutter={10}>
          <Col span={22}>
            <Input 
              placeholder="Title"
              size="large"
              className="radious"
            />
          </Col>
          <Col span={2}>
            <Select 
              defaultValue="1" 
              size="large"
              className="radious"
            >
              <Option value="1">111</Option>
              <Option value="2">222</Option>
            </Select>
          </Col>
        </Row>
      
        <Row gutter={10} style={{ marginTop: '1rem' }}>
          <Col span={12}>
              <TextArea
                className="markdown-content radious"
                rows={35}
                placeholder="Content"
                onChange={(e): void => {
                  ContenChange(e);
                }}
              />
          </Col>
          <Col span={12}>
            <div className="show-html markdown-body"
              dangerouslySetInnerHTML={{__html: mdContent}}
            >
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={6}>

        <Row>
          <Col span={24}>
            <Button
              size="large"
              className="radious"
              style={{ marginRight: '1rem' }}
            >
              导入文章
            </Button>
            <Button
              size="large"
              className="radious"
              style={{ marginRight: '1rem' }}
            >
              暂存文章
            </Button>
            <Button
              size="large"
              type="primary"
              className="radious"
            >
              保存文章
            </Button>
          </Col>

          <Col span={24} style={{ marginTop: '1rem' }}>
            <TextArea
              rows={4}
              placeholder="文章简介"
              className="radious"
              onChange={(e): void => {
                IntroductionChange(e);
              }}
            ></TextArea>
          </Col>

          <Col span={24} style={{ marginTop: '1rem' }}>
            封面
          </Col>
          <Col span={24} style={{ marginTop: '1rem' }}>
            <Upload
              name="cover"
              listType="picture-card"
              showUploadList={false}
              customRequest={(options) => {
                const { file } = options;
                console.log('options: ', file.name);
                const imgReader = new FileReader();
                imgReader.readAsDataURL(file);
                imgReader.onload = (File) => {
                  File.target?.result && typeof File.target?.result === 'string' && setImgUrl(File.target?.result);
                  setPreviewTitle(file.name);
                };
              }}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
            </Upload>
            { imageUrl ? (
              <Row>
                <Col span={24} offset={5}>
                  <Button
                    size="large"
                    className="radious"
                    style={{ marginRight: '1rem' }}
                    onClick={(): void => {
                      setPreviewVisible(true);
                    }}
                  >
                    预览图片
                  </Button>
                  <Button
                    size="large"
                    className="radious"
                    style={{ marginRight: '1rem' }}
                    onClick={(): void => {
                      setImgUrl('');
                    }}
                  >
                    删除图片
                  </Button>
                </Col>
              </Row>
            ) : null }
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={(): void => {
                setPreviewVisible(false);
              }}
            >
              <img alt="example" style={{ width: '100%' }} src={imageUrl} />
            </Modal>
          </Col>
        
          <Col span={24} style={{ marginTop: '1rem' }}>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>;
};

export default AddArticle;
