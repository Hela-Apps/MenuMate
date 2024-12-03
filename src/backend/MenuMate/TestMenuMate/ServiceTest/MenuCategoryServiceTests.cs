using Entity.Models;
using Moq;
using Repository.Interfaces;
using Services.Implementation;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit.Sdk;

namespace TestMenuMate.ServiceTest
{
    public  class MenuCategoryServiceTests
    {
        private Mock<IMenuCategoryRepository> _repositoryMock;
        private IMenuCategoryService _serviceMock;
        private IItemRepository _itemRepositoryMock;

        public MenuCategoryServiceTests()
        {
            _repositoryMock = new Mock<IMenuCategoryRepository>();
            _serviceMock = new MenuCategoryService(_repositoryMock.Object,_itemRepositoryMock);
        }

        [Theory]
        [InlineData("indian","AC001","system@gmail.com","indian","AC002", "system@gmail.com", true)]
        public async Task Add_ValidMenuCategory_ReturnsAddedMenuCategory(string name1,string code1, string createdUser1, string name2,string code2, string createdUser2,bool expected)
        {
           

            var menuCategoryToAdd = new MenuCategory
            {
                Name = name1,
                Code = code1,
                Active = true,
                CreatedDate = DateTime.Now,
                CreatedBy = createdUser1
            };

            var addedMenuCategory = new MenuCategory
            {
                Name = name2,
                Code = code2,
                Active = true,
                CreatedDate = DateTime.Now,
                CreatedBy = createdUser2
            };

            _repositoryMock.Setup(x => x.Add(It.IsAny<MenuCategory>())).ReturnsAsync(addedMenuCategory);

            // Act
            var result = await _serviceMock.Add(menuCategoryToAdd);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(addedMenuCategory, result);
            // Optionally, add more specific assertions based on your implementation
        }

        [Fact]
        public async Task Get_ReturnsNull_WhenInvalidIdProvided()
        {
            // Arrange
            int invalidId = -1; // Provide an invalid ID for testing
           
            _repositoryMock.Setup(repo => repo.GetById(invalidId)).ReturnsAsync((MenuCategory)null);

            // Act
            var result = await _serviceMock.Get(invalidId);

            // Assert
            Assert.Null(result); // Ensure that null is returned for an invalid ID
        }
        [Fact]
        public async Task Get_ReturnsMenuCategory_WhenValidIdProvided()
        {
            // Arrange
            int validId = 1; // Provide a valid ID for testing
            
            var expectedMenuCategory = new MenuCategory
            {
                Id = validId,
                // Set other properties as needed for testing
            };

            _repositoryMock.Setup(repo => repo.GetById(validId)).ReturnsAsync(expectedMenuCategory);

            // Act
            var result = await _serviceMock.Get(validId);

            // Assert
            Assert.NotNull(result); // Ensure a result is returned
            Assert.IsType<MenuCategory>(result); // Ensure the returned result is of type MenuCategory
            Assert.Equal(validId, result.Id); // Validate if the returned ID matches the expected ID
            // Add other assertions for properties as needed
        }

    }
}
