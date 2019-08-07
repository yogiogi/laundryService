import { whileStatement } from "@babel/types";
import { Right } from "native-base";

export default {
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  sect1: {
    flex: 1,
    padding: 5
  },
  textSect1: {
    fontSize: 18,
    color: '#82D4E3',
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  box: {
    height: 10,
  },
  box1: {
    flex: 3,
  },
  box2: {
    flex: 10,
  },
  box3: {
    flex: 2,
  },
  boxPrice: {
    flex: 2,
    backgroundColor: '#82D4E3',
    padding: 5,
  },
  textTitle: {
    textAlign: 'left',
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  textPrice: {
    textAlign: 'left',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  boxReview: {
    flex: 1,
    backgroundColor: '#82D4E3',
    justifyContent: 'center',
    alignItems: 'center',
  }
};