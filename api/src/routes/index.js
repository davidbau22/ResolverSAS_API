const { Router } = require('express');
const {Sucursal, Technician, Client} = require('../db');
require('dotenv').config();
const { sequelize } = require('sequelize');



const router = Router();

// router.get('/', async (req, res)=>{

// })

router.get('/subsidiary', async (req, res) => {
    const {name} = req.query;
    
    const sucursales = await Sucursal.findAll();

    if(sucursales.length > 0) {

        res.status(200).send(sucursales) 
        
        
    }else{
        res.status(404).send('No hay sucursales para mostrar');
    }

});



router.get('/sucursal/:subsidiaryType', async (req, res) => {
    const { subsidiaryType } = req.params;
  
    try {
      const result = await Sucursal.findOne({
        where: { subsidiaryType },
        include: [
          {
            model: Technician,
            as: 'technicians',
          },
          {
            model: Client,
            as: 'clients',
          },
        ],
      });
      const resultJson = JSON.stringify(result.dataValues);
  
      if (!result) {
        return res.status(404).json({ error: 'No se encontró la sucursal' });
      }
  
      res.status(200).send(resultJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
 
router.get('/technician/:id', async (req, res) => {
   try {

    
    const {id} = req.params;
    const detail_Tec = await Technician.findByPk(id.toString())
    console.log(detail_Tec,'soy detailed Technician');

    const result = JSON.stringify(detail_Tec.dataValues)

    detail_Tec!=null?
    res.status(200).send(result): res.status(400).json({error:'no se ha encontrado un tecnico'});

   } catch (error) {
    console.log(error,'soy error')
   }

})

router.post('/createtechnician', async (req, res) => {
    try {
        let { id, name,email, subsidiary } = req.body;
        console.log({ id, name,email, subsidiary} )

        let technicianCreated12 = await Technician.create({ 
            id:id,
            name : name, 
            email: email,
            subsidiary: subsidiary, 
        })
            .then((response) => {
                return response
            })
            .catch((error) => {
                console.log(error);
            });

        res.status(200).json(technicianCreated12)
    }
    catch (error) {
        console.log(error.message);
    }
})

router.post('/createjob/:tecnnicianid', async (req, res) => {
    try {
        let {  id, clientName, issueDate, workType, orderNumber, resource  } = req.body;
        console.log({ id, clientName, issueDate, workType, orderNumber, resource} )
        const technician = await Technician.findByPk(id);
        console.log(technician.dataValues);
        const jobData = [{
            clientName : clientName,
            issueDate : issueDate,
            workType : workType,
            orderNumber : orderNumber,
        }]
        const resourceTech = [resource]
        console.log(jobData);
        console.log(resourceTech);

        
        
        if (!technician) {
            return res.status(404).json({ message: 'Técnico no encontrado' });
        }else {
            await technician.update(
                {
                  currentlyStatus:'active',  
                  jobsAssigned: [...jobData],
                  assignedResourses: [...resourceTech],
                },
                {
                  where: { id: id },
                }
              );   
            await technician.save()
        }
        


        res.status(200).json({ message: 'Trabajo creado exitosamente' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error al crear el trabajo' });
    }
})
router.patch('/updateTechnician/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const {email, status} = req.body;
        const technician = await Technician.findByPk(id.toString());

        if (!technician) {
          return res.status(404).json({ message: 'Técnico no encontrado' });
        }
    
        await technician.update({
            email: email,
            currentlyStatus: status,
        });
    
        return res.status(200).json({ message: 'Técnico actualizado exitosamente' });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al actualizar el técnico' });
      }
    });
module.exports = router;
