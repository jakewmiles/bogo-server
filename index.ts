import express from'express';
import cors from'cors';
import router from'./router'
import { sequelize} from './models/index';

const app = express();

const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json());
app.use(router);



sequelize.sync().then(() => {
app.listen(PORT, error => {
  error && console.log(error);
  console.log(`server is running on ${PORT}🎉`);
});
})