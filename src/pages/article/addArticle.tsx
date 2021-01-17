import React, { useState } from 'react';
import marked from 'marked';
import '../../static/css/article/addArticle.css';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle: React.FC<{}> = () => {

  const [articleID, setArticleID] = useState<number>(0); // 文章ID，0-新增 非0-编辑
  const [articleTitle, setArticleTitle] = useState<string>(''); // 文章标题
  const [articleContent, setArticleContent] = useState<string>(''); // 文章内容
  const [mdContent, setMdContent] = useState<string>(''); // markdown 编辑内容
  const [introductionMD, setIntroductionMd] = useState<string>(''); // 文章简介
  const [introductionHtml, setIntroductionHtml] = useState<string>(''); // 文章简介预览
  const [createDate, setCreateDate] = useState<string>(''); // 文章发布日期
  const [updateDate, setUpdateDate] = useState<string>(''); // 文章更新日期
  const [typeInfo, setTypeInfo] = useState<Array<number>>([]); // 文章类型
  const [selectedType, setSelectedType] = useState<number>(1); // 文章类型

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
    let html = marked(e.target.value);
    setIntroductionHtml(html);
  }

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
            <div className="show-html"
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

            <div 
              className="introduce-html"
              dangerouslySetInnerHTML={{__html: introductionHtml}}
              style={{ marginTop: '1rem' }}>

            </div>
          </Col>

          <Col span={12} style={{ marginTop: '1rem' }}>
            <div className="date-select">
              <DatePicker 
                placeholder="发布日期"
                size="large"
                className="radious"
              />
            </div>
          </Col>
          <Col span={12} style={{ marginTop: '1rem' }}>
            <div className="date-select">
              <DatePicker 
                placeholder="修改日期"
                size="large"
                className="radious"
              />
            </div>
          </Col>
        </Row>

      </Col>
    </Row>
  </div>;
};

export default AddArticle;
