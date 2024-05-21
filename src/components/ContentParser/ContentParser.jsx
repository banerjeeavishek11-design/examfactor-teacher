import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import MathJax from '../mathjax/Mathjax';

// import QuestionTable from '../Table/QuestionTable';

const mmlOptions = {
  styles: {
    '#formula': {
      color: 'white',
      'font-family': 'Poppins-SemiBold',
    },
  },
  jax: ['input/MathML'],
};
const mathjaxStyles = {
  mathjaxContainer: {
    backgroundColor: 'transparent',
  },
};

const ContentParser = ({ content }) => {
  const [parsed, setParsed] = useState([]);

  useEffect(() => {}, [parsed]);

  useEffect(() => {
    if (content?.length) {
      structureData();
    }
  }, [content, structureData]);

  const structureData = () => {
    const temp = [];
    let text = '';
    let flag = false;
    let data = '';
    content.forEach((ele, i) => {
      if (ele.contentType === 'TEXT') {
        if (ele.startPosition === 'NEW_LINE' && i > 0) {
          temp.push({
            contentType: ele.contentType,
            data: text,
          });
          text = ele.data;
        } else {
          text += ele.data;
        }
        if (i + 1 === content.length) {
          data = text;
          flag = true;
        }
      }
      if (ele.contentType === 'IMAGE' || ele.contentType === 'TABLE') {
        flag = true;
        if (i > 0 && text) {
          temp.push({
            contentType: content[i - 1].contentType,
            data: text,
          });
          text = '';
        }
      }
      if (ele.contentType === 'IMAGE') {
        data = ele.data;
      }
      if (ele.contentType === 'TABLE') {
        data = ele.dataTableContent;
      }
      if (flag) {
        flag = false;
        temp.push({
          contentType: ele.contentType,
          data,
        });
      }
    });
    setParsed(temp);
  };

  const getParsedType = (type, data) => {
    switch (type) {
      case 'TEXT':
        return (
          <MathJax
            mathJaxOptions={mmlOptions}
            html={data}
            style={[mathjaxStyles.mathjaxContainer]}
          />
        );
      case 'IMAGE':
        return (
          <Image
            source={{ uri: data }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
              backgroundColor: 'white',
              padding: 3,
              resizeMode: 'contain',
            }}
          />
        );
      case 'TABLE':
        // return <QuestionTable content={data} />;
        break;
      default:
        return <></>;
    }
  };

  return (
    <>
      <View>
        {parsed.map((val, index) => {
          return (
            <View key={val.data + index} pointerEvents="none">
              {getParsedType(val.contentType, val.data)}
            </View>
          );
        })}
      </View>
    </>
  );
};

export default ContentParser;

// const styles = StyleSheet.create({});
