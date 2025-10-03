const express = require('express');
const productRoutes = require('./routes/productRoutes');
const duplicateRoutes = require('./routes/duplicateRoutes');
const rejectedRecordRoutes = require('./routes/rejectedRecordRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', duplicateRoutes);
app.use('/api', rejectedRecordRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
