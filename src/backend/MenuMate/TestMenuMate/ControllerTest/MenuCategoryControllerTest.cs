using AutoMapper;
using Castle.Core.Logging;
using Entity.Models;
using Entity.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Controllers;

namespace TestMenuMate.ControllerTest
{
    public  class MenuCategoryControllerTest
    {
        [Fact]
        public async Task Add_ValidModel_ReturnsOkResult()
        {
            // Arrange
            var mapperMock = new Mock<IMapper>(); // Assuming _mapper is an IMapper
            var serviceMock = new Mock<IMenuCategoryService>(); // Assuming _service is an IMenuCategoryService
            var loggerMock = new Mock<ILogger<MenuCategoryController>>();

            var controller = new MenuCategoryController(serviceMock.Object, mapperMock.Object, loggerMock.Object);

            var modelVM = new MenuCategoryVM
            {
               Name = "Sri Lankan",
               Active = true,
            };

            var mappedModel = new MenuCategory
            {
                CreatedBy = "system@gmail.com",
                
            };

            mapperMock.Setup(x => x.Map<MenuCategory>(It.IsAny<MenuCategoryVM>())).Returns(mappedModel);
            serviceMock.Setup(x => x.Add(It.IsAny<MenuCategory>())).ReturnsAsync(mappedModel);

            // Act
            var result = await controller.Add(modelVM) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(StatusCodes.Status200OK, result.StatusCode);

            // Optionally, you can assert the returned value as well
            // For example:
            // Assert.Equal(mappedModel, result.Value);
        }        

    }
}
