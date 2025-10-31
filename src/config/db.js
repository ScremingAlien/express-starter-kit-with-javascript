const  connectDb= async()=>{
    try {
      const  connectionInstance=  await mongoose.connect(`${process.env.DB_URL}`);
      if(!connectionInstance||connectionInstance===undefined){
        console.log(`database  cannot be created  please  check  env.`)
      }
      console.log(`database  connect successfully ${connectionInstance.connection.host}`);
      
        
    } catch (error) {
        console.log(`error in  database  connection  cannot connect due  to  err : ${error}`);
        
    }
}
